"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import styles from "./orb-viewer.module.css";

export function OrbViewer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;
    let rafId;
    let mixer = null;

    // Dimensions
    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();

    // Camera with 45 deg FOV
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Balanced clean lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Subtle purple point light matching the logo color (#6C2BD9)
    const purpleLight = new THREE.PointLight(0x6c2bd9, 2.8, 16);
    purpleLight.position.set(0, 0, 4);
    scene.add(purpleLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa78bfa, 1.2);
    dirLight2.position.set(-3, -3, 2);
    scene.add(dirLight2);

    // Subtle purple glow halo sprite matching logo (#6C2BD9)
    const canvasGlow = document.createElement("canvas");
    canvasGlow.width = 512;
    canvasGlow.height = 512;
    const ctx = canvasGlow.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
      grad.addColorStop(0, "rgba(167, 139, 250, 0.75)"); // Ethereal lavender center
      grad.addColorStop(0.3, "rgba(108, 43, 217, 0.65)"); // Logo purple core (#6C2BD9)
      grad.addColorStop(0.65, "rgba(108, 43, 217, 0.28)"); // Outer purple rim
      grad.addColorStop(0.88, "rgba(108, 43, 217, 0.08)"); // Soft halo falloff
      grad.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fade to transparent
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      const glowTex = new THREE.CanvasTexture(canvasGlow);
      const glowMat = new THREE.SpriteMaterial({
        map: glowTex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(1.95, 1.95, 1);
      glowSprite.position.set(0, 0, -0.05);
      scene.add(glowSprite);
    }

    // Orbit Controls:
    // Drag and spin enabled, static size (no zoom)
    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false; // Strictly static in size - no zooming allowed
    controls.enablePan = false; // Disallow panning away from center
    controls.enableRotate = true; // Drag and spin enabled
    controls.autoRotate = true; // Subtle continuous ambient rotation
    controls.autoRotateSpeed = 1.0;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.85;

    // Load orb2.glb
    const loader = new GLTFLoader();
    loader.load(
      "/orb2.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        // Hide external cylinder desk stand so the plasma orb floats cleanly
        model.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes("cylinder")) {
            child.visible = false;
          }
        });

        // Auto-center model at origin (0, 0, 0) based on visible orb geometry
        const box = new THREE.Box3();
        model.traverse((child) => {
          if (child.isMesh && child.visible) {
            box.expandByObject(child);
          }
        });
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        scene.add(model);

        // Frame camera distance so size is static, perfectly balanced, and matches the composition
        const maxDim = Math.max(size.x, size.y, size.z) || 1.28;
        const fov = camera.fov * (Math.PI / 180);
        let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.45;
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.update();

        // Play internal Take 01 animation
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Failed to load /orb2.glb:", err);
        if (!disposed) setHasError(true);
      }
    );

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      if (disposed || !entries[0]) return;
      const rect = entries[0].contentRect;
      const w = rect.width;
      const h = rect.height;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop with delta timing
    let lastTime = performance.now();
    function animate() {
      if (disposed) return;
      rafId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (mixer) {
        mixer.update(delta);
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      controls.dispose();

      if (mixer) {
        mixer.stopAllAction();
      }

      // Memory cleanup for Three.js
      scene.traverse((obj) => {
        if (obj.isMesh || obj.isSprite) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.orbViewerContainer} ref={containerRef}>
      {/* Subtle purple glow around the orb matching logo color (#6C2BD9) */}
      <div className={`${styles.orbGlow} ${isLoaded ? styles.orbGlowVisible : ""}`} aria-hidden="true" />

      {/* Loading Skeleton / Pulse */}
      {!isLoaded && !hasError && (
        <div className={styles.loaderWrap}>
          <div className={styles.spinnerCore} />
          <span className={styles.loaderText}>Calibrating 3D Core...</span>
        </div>
      )}

      {hasError && (
        <div className={styles.errorWrap}>
          <span>Failed to load 3D Orb model.</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`${styles.orbCanvas} ${isLoaded ? styles.orbCanvasVisible : ""}`}
        aria-label="Interactive 3D Orb - Drag to spin"
      />
    </div>
  );
}

export default OrbViewer;
