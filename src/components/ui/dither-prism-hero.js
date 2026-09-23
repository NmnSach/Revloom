"use client";
import { useRef, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WebGLErrorBoundary, WebGLFallback } from "@/components/ui/webgl-error-boundary";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERTEX SHADER
// ═══════════════════════════════════════════════════════════════════════════════
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// FRAGMENT SHADER - Advanced Dithering + Prismatic Refraction + Holographic
// ═══════════════════════════════════════════════════════════════════════════════
const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uDitherIntensity;
uniform float uPrismIntensity;
varying vec2 vUv;
varying vec3 vPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash3(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    value += amplitude * snoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

float bayer8x8(vec2 uv) {
  ivec2 p = ivec2(mod(uv, 8.0));
  int matrix[64];
  matrix[0] = 0;  matrix[1] = 32; matrix[2] = 8;  matrix[3] = 40; matrix[4] = 2;  matrix[5] = 34; matrix[6] = 10; matrix[7] = 42;
  matrix[8] = 48; matrix[9] = 16; matrix[10] = 56; matrix[11] = 24; matrix[12] = 50; matrix[13] = 18; matrix[14] = 58; matrix[15] = 26;
  matrix[16] = 12; matrix[17] = 44; matrix[18] = 4; matrix[19] = 36; matrix[20] = 14; matrix[21] = 46; matrix[22] = 6; matrix[23] = 38;
  matrix[24] = 60; matrix[25] = 28; matrix[26] = 52; matrix[27] = 20; matrix[28] = 62; matrix[29] = 30; matrix[30] = 54; matrix[31] = 22;
  matrix[32] = 3;  matrix[33] = 35; matrix[34] = 11; matrix[35] = 43; matrix[36] = 1;  matrix[37] = 33; matrix[38] = 9;  matrix[39] = 41;
  matrix[40] = 51; matrix[41] = 19; matrix[42] = 59; matrix[43] = 27; matrix[44] = 49; matrix[45] = 17; matrix[46] = 57; matrix[47] = 25;
  matrix[48] = 15; matrix[49] = 47; matrix[50] = 7; matrix[51] = 39; matrix[52] = 13; matrix[53] = 45; matrix[54] = 5; matrix[55] = 37;
  matrix[56] = 63; matrix[57] = 31; matrix[58] = 55; matrix[59] = 23; matrix[60] = 61; matrix[61] = 29; matrix[62] = 53; matrix[63] = 21;
  return float(matrix[p.y * 8 + p.x]) / 64.0;
}

float blueNoise(vec2 uv, float time) {
  float n1 = hash(uv + vec2(time * 0.1, 0.0));
  float n2 = hash(uv * 2.1 + vec2(0.0, time * 0.13));
  float n3 = hash(uv * 4.3 + vec2(time * 0.07, time * 0.11));
  return fract(n1 + n2 * 0.5 + n3 * 0.25);
}

vec3 prism(vec2 uv, float time, float intensity) {
  float angle = atan(uv.y - 0.5, uv.x - 0.5);
  float dist = length(uv - 0.5);
  float prismAngle = angle + time * 0.3 + dist * 3.0;
  
  float r = 0.5 + 0.5 * sin(prismAngle);
  float g = 0.5 + 0.5 * sin(prismAngle + 2.094);
  float b = 0.5 + 0.5 * sin(prismAngle + 4.188);
  
  return vec3(r, g, b) * intensity;
}

vec3 iridescence(vec2 uv, float time) {
  float t = time * 0.5;
  vec2 p = uv * 3.0;
  
  float n1 = snoise(p + vec2(t, 0.0));
  float n2 = snoise(p * 1.3 + vec2(0.0, t * 0.7));
  float n3 = snoise(p * 0.7 + vec2(t * 0.5, t * 0.3));
  
  vec3 col1 = vec3(0.5 + 0.5 * sin(n1 * 3.14159 + t));
  vec3 col2 = vec3(0.5 + 0.5 * sin(n2 * 3.14159 + t * 1.3 + 2.0));
  vec3 col3 = vec3(0.5 + 0.5 * sin(n3 * 3.14159 + t * 0.7 + 4.0));
  
  return (col1 + col2 + col3) / 3.0;
}

float diamond(vec2 p) {
  return abs(p.x) + abs(p.y);
}

float morphShape(vec2 uv, float time) {
  float morph = sin(time * 0.4) * 0.5 + 0.5;
  vec2 p = uv * 4.0 - 2.0;
  p = p + vec2(sin(time * 0.3), cos(time * 0.4)) * 0.5;
  
  float circle = length(p) - 1.0;
  float diam = diamond(p) - 1.4;
  float shape = mix(circle, diam, morph);
  
  vec2 q = mod(uv * 8.0, 2.0) - 1.0;
  float multiShape = mix(length(q), diamond(q), morph) - 0.3;
  return min(shape, multiShape);
}

float mouseRipple(vec2 uv, vec2 mouse, float time, float intensity) {
  float dist = length(uv - mouse);
  float ripple1 = sin(dist * 40.0 - time * 5.0) * exp(-dist * 3.0);
  float ripple2 = sin(dist * 25.0 - time * 3.5 + 1.0) * exp(-dist * 4.0);
  float ripple3 = sin(dist * 60.0 - time * 7.0) * exp(-dist * 5.0);
  return (ripple1 + ripple2 * 0.5 + ripple3 * 0.3) * intensity;
}

vec3 mouseGlow(vec2 uv, vec2 mouse, float time, float intensity, vec3 glowColor) {
  float dist = length(uv - mouse);
  float core = exp(-dist * 15.0) * 1.5;
  float outer = exp(-dist * 5.0) * 0.8;
  float pulse = 0.8 + 0.2 * sin(time * 3.0);
  
  float chromatic = sin(dist * 30.0 + time * 2.0) * exp(-dist * 8.0);
  vec3 rainbow = vec3(
    sin(time * 2.0) * 0.5 + 0.5,
    sin(time * 2.0 + 2.094) * 0.5 + 0.5,
    sin(time * 2.0 + 4.188) * 0.5 + 0.5
  );
  
  vec3 glow = glowColor * (core + outer) * pulse * intensity;
  glow += rainbow * chromatic * intensity * 0.5;
  return glow;
}

vec2 mouseLensDistort(vec2 uv, vec2 mouse, float intensity) {
  vec2 delta = uv - mouse;
  float dist = length(delta);
  float distortion = exp(-dist * 6.0) * intensity * 0.15;
  return uv + normalize(delta + 0.001) * distortion;
}

void main() {
  vec2 uv = vUv;
  vec2 pixelCoord = gl_FragCoord.xy;
  float time = uTime;
  
  // Layer 0: Mouse lens distortion
  vec2 distortedUv = mouseLensDistort(uv, uMouse, uMouseIntensity);
  
  // Layer 1: Base flowing gradient with FBM simplex noise
  float noise1 = fbm(distortedUv * 2.0 + vec2(time * 0.05, time * 0.03), 4);
  float noise2 = fbm(distortedUv * 3.0 + vec2(-time * 0.04, time * 0.06), 3);
  
  float diagonal = (distortedUv.x + distortedUv.y) * 0.5;
  float flow = diagonal + noise1 * 0.3 + noise2 * 0.2;
  flow += sin(time * 0.2) * 0.1;
  
  // Layer 2: Color mixing with tri-color gradient
  vec3 col;
  float t1 = smoothstep(0.0, 0.5, flow);
  float t2 = smoothstep(0.5, 1.0, flow);
  col = mix(uColor1, uColor2, t1);
  col = mix(col, uColor3, t2);
  
  // Layer 3: Prismatic light refraction
  vec3 prismColor = prism(distortedUv, time, uPrismIntensity);
  float edgeMask = abs(fract(flow * 5.0) - 0.5) * 2.0;
  edgeMask = smoothstep(0.3, 0.7, edgeMask);
  col += prismColor * edgeMask * 0.4;
  
  // Layer 4: Iridescent holographic overlay
  vec3 iris = iridescence(distortedUv, time);
  float irisMask = snoise(distortedUv * 5.0 + time * 0.1);
  irisMask = smoothstep(-0.2, 0.8, irisMask) * 0.15;
  col = mix(col, iris, irisMask);
  
  // Layer 5: Geometric crystal patterns
  float shape = morphShape(distortedUv, time);
  float shapeMask = 1.0 - smoothstep(-0.1, 0.1, shape);
  col = mix(col, col * 1.15 + vec3(0.08), shapeMask * 0.3);
  
  // Layer 6: Dynamic mouse ripples, cursor glow, and proximity color shift
  float ripple = mouseRipple(uv, uMouse, time, uMouseIntensity);
  col += ripple * prismColor * 1.2;
  col += ripple * vec3(0.3, 0.2, 0.4);
  
  vec3 glow = mouseGlow(uv, uMouse, time, uMouseIntensity, vec3(1.0, 0.8, 1.0));
  col += glow;
  
  float mouseDist = length(uv - uMouse);
  float proximityBoost = exp(-mouseDist * 4.0) * uMouseIntensity;
  col = mix(col, col * 1.5 + prismColor * 0.3, proximityBoost);
  
  // Layer 7: Bayer 8x8 matrix + blue noise dithering
  float bayer = bayer8x8(pixelCoord);
  float blue = blueNoise(pixelCoord * 0.1, time);
  float ditherPattern = mix(bayer, blue, 0.3 + 0.2 * sin(time * 0.5));
  
  vec3 ditherOffset = (vec3(ditherPattern) - 0.5) * uDitherIntensity;
  col += ditherOffset;
  
  // Color quantization for signature retro dither effect
  float levels = 16.0;
  vec3 quantized = floor(col * levels + ditherPattern) / levels;
  col = mix(col, quantized, uDitherIntensity * 0.5);
  
  // Layer 8: Scanline depth
  float scanline = sin(pixelCoord.y * 2.0 + time * 2.0) * 0.02;
  col += scanline * uDitherIntensity;
  
  // Layer 9: Vignette
  float vignette = 1.0 - length((uv - 0.5) * 1.2);
  vignette = smoothstep(0.0, 0.7, vignette);
  col *= 0.85 + vignette * 0.15;
  
  col = clamp(col, 0.0, 1.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// WebGL Shader Mesh Component
// ═══════════════════════════════════════════════════════════════════════════════
const DitherPrismPlane = ({
  color1,
  color2,
  color3,
  speed = 1,
  ditherIntensity = 0.15,
  prismIntensity = 0.5,
}) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const { size } = useThree();

  useFrame((state) => {
    const material = materialRef.current;
    if (!material || !material.uniforms) return;
    const { clock, pointer } = state;
    const uniforms = material.uniforms;

    uniforms.uTime.value = clock.getElapsedTime() * speed;
    uniforms.uResolution.value.set(size.width, size.height);

    if (pointer) {
      const targetX = (pointer.x + 1) * 0.5;
      const targetY = (pointer.y + 1) * 0.5;
      uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.1;
      uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.1;
    }

    uniforms.uMouseIntensity.value = 0.8;
    uniforms.uColor1.value.set(color1);
    uniforms.uColor2.value.set(color2);
    uniforms.uColor3.value.set(color3);
    uniforms.uDitherIntensity.value = ditherIntensity;
    uniforms.uPrismIntensity.value = prismIntensity;
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1000, 1000) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseIntensity: { value: 0.8 },
          uColor1: { value: new THREE.Color(color1) },
          uColor2: { value: new THREE.Color(color2) },
          uColor3: { value: new THREE.Color(color3) },
          uDitherIntensity: { value: ditherIntensity },
          uPrismIntensity: { value: prismIntensity },
        }}
        transparent={true}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Floating Particles Constellation Layer
// ═══════════════════════════════════════════════════════════════════════════════
const FloatingParticles = ({ count = 50, color = "#ffffff" }) => {
  const pointsRef = useRef(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 4;
      positions[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 4;
      positions[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 2;
      sizes[i] = pseudoRandom(i * 3 + 4) * 3 + 1;
      phases[i] = pseudoRandom(i * 3 + 5) * Math.PI * 2;
    }

    return { positions, sizes, phases };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current?.geometry?.attributes?.position) return;
    const time = clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const positions = positionAttr.array;

    for (let i = 0; i < count; i++) {
      const phase = particles.phases[i] || 0;
      const yIdx = i * 3 + 1;
      const xIdx = i * 3;
      positions[yIdx] = (positions[yIdx] || 0) + Math.sin(time + phase) * 0.001;
      positions[xIdx] = (positions[xIdx] || 0) + Math.cos(time * 0.5 + phase) * 0.0005;

      if ((positions[yIdx] || 0) > 2) positions[yIdx] = -2;
      if ((positions[yIdx] || 0) < -2) positions[yIdx] = 2;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DitherPrismBackground - Canvas Layer (Can be slotted into any background)
// ═══════════════════════════════════════════════════════════════════════════════
export function DitherPrismBackground({
  color1 = "#0A0810",
  color2 = "#6C2BD9",
  color3 = "#FF4FCE",
  speed = 1,
  ditherIntensity = 0.15,
  prismIntensity = 0.5,
  particleCount = 50,
  showParticles = true,
  particleColor = "#ffffff",
  className = "",
  style = {},
}) {
  const mounted = useIsMounted();

  if (!mounted) return null;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "auto",
        ...style,
      }}
    >
      <WebGLErrorBoundary fallback={<WebGLFallback style={{ position: "absolute", inset: 0 }} />}>
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 2]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <DitherPrismPlane
            color1={color1}
            color2={color2}
            color3={color3}
            speed={speed}
            ditherIntensity={ditherIntensity}
            prismIntensity={prismIntensity}
          />
          {showParticles && (
            <FloatingParticles count={particleCount} color={particleColor} />
          )}
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DitherPrismHero - Complete Hero Section Component
// ═══════════════════════════════════════════════════════════════════════════════
export function DitherPrismHero({
  title1,
  title2,
  color1 = "#0A0810",
  color2 = "#6C2BD9",
  color3 = "#FF4FCE",
  speed = 1,
  ditherIntensity = 0.15,
  prismIntensity = 0.5,
  particleCount = 50,
  showParticles = true,
  particleColor = "#ffffff",
  className = "",
  children,
  style = {},
  ...props
}) {
  return (
    <div
      className={cn(
        "relative w-full min-h-screen flex flex-col items-center overflow-hidden text-gray-900",
        className
      )}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        containerType: "size",
        ...style,
      }}
      {...props}
    >
      {/* WebGL Canvas Background */}
      <DitherPrismBackground
        color1={color1}
        color2={color2}
        color3={color3}
        speed={speed}
        ditherIntensity={ditherIntensity}
        prismIntensity={prismIntensity}
        particleCount={particleCount}
        showParticles={showParticles}
        particleColor={particleColor}
      />

      {/* Content Overlay */}
      {(title1 || title2 || children) && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Componentry Animated Headline */}
            {(title1 || title2) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.75rem",
                  marginBottom: "2.5rem",
                }}
              >
                {title1 && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.h1
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2,
                      }}
                      style={{
                        paddingBottom: "0.08em",
                        fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)",
                        lineHeight: 0.96,
                        letterSpacing: "-0.04em",
                        fontWeight: 800,
                        fontFamily: "var(--font-headline)",
                        background: "linear-gradient(180deg, #FFFFFF 0%, #D4CEE8 55%, #8E84A6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <span>{title1}</span>
                    </motion.h1>
                  </div>
                )}
                {title2 && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.h1
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.35,
                      }}
                      style={{
                        paddingBottom: "0.08em",
                        fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)",
                        lineHeight: 0.96,
                        letterSpacing: "-0.04em",
                        fontWeight: 800,
                        fontFamily: "var(--font-headline)",
                        background: "linear-gradient(180deg, #FFFFFF 0%, #E8A8FF 40%, #C6FF3D 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <span>{title2}</span>
                    </motion.h1>
                  </div>
                )}
              </div>
            )}

            {/* Custom Children */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                style={{ width: "100%" }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DitherPrismHero;
