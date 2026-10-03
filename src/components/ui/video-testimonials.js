"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Play, Check } from "lucide-react";
import styles from "./video-testimonials.module.css";

export const VIDEO_REELS = [
  {
    id: "shiv-mohan-dutt",
    name: "Shiv Mohan Dutt",
    role: "Founder & CEO",
    company: "MeaVana",
    tagline: "AI Productivity Infrastructure",
    thumbnail: "/avatars/testimonials/shiv-mohan-dutt.jpg",
    duration: "1:12",
    tag: "Scale Story",
    metric: "4 Channels Scaled",
    quoteSnippet:
      "Janhvi was able to add significant impact across multiple domains—from Twitter and Pinterest to recruiting and email.",
    fullQuote:
      "From managing several Pinterest accounts, to our Twitter, to effective recruiting, to email marketing, Janhvi was able to add significant areas across multiple domains. We have no doubt that she will achieve incredible things!",
    linkedinUrl: "https://www.linkedin.com/in/shiv-mohan-dutt/",
  },
  {
    id: "vaibhav-pandey",
    name: "Vaibhav Pandey",
    role: "Founder & Outreach Operator",
    company: "B2B Outreach",
    tagline: "Lead Gen & Sales Pipeline",
    thumbnail: "/avatars/testimonials/vaibhav-pandey.jpg",
    duration: "0:45",
    tag: "Conversion Result",
    metric: "1 Client in 50 DMs",
    quoteSnippet:
      "Her skills are unmatched when it comes to LinkedIn DMs. Her advice helped me sign 1 client in just 50 DMs sent!",
    fullQuote:
      "Janhvi is super friendly, helped me transform my LinkedIn profile, how to come up with great post ideas, and her skills are unmatched when it comes to LinkedIn DMs. Her advice helped me sign 1 client in just 50 DMs sent!",
    linkedinUrl: null,
  },
  {
    id: "abhiruchi-atri",
    name: "Abhiruchi Atri",
    role: "Founder & Author",
    company: "AmpliRise",
    tagline: "L&D Strategy & Executive Training",
    thumbnail: "/avatars/testimonials/abhiruchi-atri.jpg",
    duration: "0:58",
    tag: "Client Retained",
    metric: "Signed 2nd Month",
    quoteSnippet:
      "Dependable in execution, proactive follow-ups, and smooth team coordination. Signed her up for another month!",
    fullQuote:
      "I’ve had a great experience working with Janhvi. She has a strong understanding of digital marketing and is very dependable in execution. What stands out most is her coordination with her team, proactive follow-ups, and ability to quickly understand requirements. The fact that I have signed her up for another month speaks for itself.",
    linkedinUrl: "https://www.linkedin.com/in/abhiruchi-atri-corporatetrainer/",
  },
  {
    id: "ayush-shaw",
    name: "Ayush Shaw",
    role: "Founder & CEO",
    company: "YourAKShawInc",
    tagline: "AI Engineer & Agentic Systems",
    thumbnail: "/avatars/testimonials/ayush-shaw.jpg",
    duration: "1:05",
    tag: "AI Workflows",
    metric: "Effortless Inbound",
    quoteSnippet:
      "Proprietary GPT workflows and expert guidance on natural, professional lead nurturing added immense value.",
    fullQuote:
      "I had the privilege of consulting with Janhvi on growing my LinkedIn presence strategically to generate inbound leads effortlessly. She generously shared her proprietary GPT tool and expert guidance on natural, professional lead nurturing.",
    linkedinUrl: "https://www.linkedin.com/in/yourakshaw/",
  },
  {
    id: "nitu-singh",
    name: "Nitu Singh",
    role: "Founder",
    company: "Nika World",
    tagline: "Luxury B2B Fashion Exports",
    thumbnail: "/avatars/testimonials/nitu-singh.jpg",
    duration: "0:52",
    tag: "Executive Brand",
    metric: "Zero Friction",
    quoteSnippet:
      "Takes the 'hard' out of any hard work. Invaluable asset for harnessing LinkedIn and building category trust.",
    fullQuote:
      "Janhvi has proved to be an invaluable asset for me! I was too busy and unsure on how to harness the power of LinkedIn, and with her diligence and sincerity she has guided me to understand its importance in building a community.",
    linkedinUrl: "https://www.linkedin.com/in/nitu-singh-nikaworld/",
  },
  {
    id: "parikshit-sharma",
    name: "Parikshit Sharma",
    role: "BDE & Lead Gen Specialist",
    company: "PAX Edutainment",
    tagline: "International Programs",
    thumbnail: "/avatars/testimonials/parikshit-s.jpg",
    duration: "0:56",
    tag: "Consultancy Result",
    metric: "1-Mo Turnaround",
    quoteSnippet:
      "Processes for lead gen, prospecting, and LinkedIn outreach improved immensely within 1 month.",
    fullQuote:
      "I took a 1 month consultancy from Janhvi and it helped me immensely. My processes for lead gen, prospecting, and linkedin outreach, has improved a lot. The consultancy style is personal and experience based, which was what I needed.",
    linkedinUrl: "https://www.linkedin.com/in/parikshit-s-787a45194/",
  },
  {
    id: "titus-george",
    name: "Titus George",
    role: "Agency Founder",
    company: "Creative Concepts",
    tagline: "Brand Communication & Campaigns",
    thumbnail: "/avatars/testimonials/titus-george.jpg",
    duration: "1:15",
    tag: "Career Launch",
    metric: "Closed Clients",
    quoteSnippet:
      "Gave me a clear roadmap to position myself on LinkedIn, build authority and close high-value clients.",
    fullQuote:
      "She was the person who showed me what social selling actually looks like. Her planning and strategy gave me a clear roadmap. Because of that structure, I started gaining inbound interest, booked calls, and eventually closed clients.",
    linkedinUrl: "https://www.linkedin.com/in/titus-george-892344290/",
  },
  {
    id: "zenox-ai",
    name: "Zenox AI Team",
    role: "Founder",
    company: "Zenox AI Systems",
    tagline: "Autonomous Agentic Workflows",
    thumbnail: "/avatars/testimonials/zenox-ai.jpg",
    duration: "0:48",
    tag: "AI Strategy",
    metric: "Multi-Solution",
    quoteSnippet:
      "Analyzed our problem thoroughly and delivered multiple actionable, high-leverage solutions.",
    fullQuote:
      "Amazing person, so much insightful & helpful meeting I had with Janhvi. I appreciate the time & effort she had put to analyze my problem and given me multiple solutions.",
    linkedinUrl: null,
  },
];

export function VideoTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [activeModalReel, setActiveModalReel] = useState(null);

  const onSelect = useCallback((api) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setScrollSnaps(api.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);

  const visibleDots = useMemo(() => {
    const maxDots = 6;
    const count = scrollSnaps.length;
    if (count <= maxDots) {
      return scrollSnaps.map((_, i) => i);
    }
    let start = selectedIndex - Math.floor((maxDots - 1) / 2);
    if (start < 0) start = 0;
    if (start > count - maxDots) start = count - maxDots;
    return Array.from({ length: maxDots }, (_, i) => start + i);
  }, [scrollSnaps, selectedIndex]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalReel(null);
      }
    };
    if (activeModalReel) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalReel]);

  return (
    <div className={styles.videoSectionWrapper}>
      {/* Reel Carousel Track */}
      <div className={styles.carouselRoot}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.track}>
            {VIDEO_REELS.map((reel) => (
              <div key={reel.id} className={styles.slide}>
                <div className={styles.reelCard}>
                  {/* 9:16 Vertical Video Frame */}
                  <div
                    className={styles.videoFrame}
                    onClick={() => setActiveModalReel(reel)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Watch video testimonial from ${reel.name} (${reel.company})`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveModalReel(reel);
                      }
                    }}
                  >
                    {/* Cover Thumbnail Image */}
                    <Image
                      src={reel.thumbnail}
                      alt={reel.name}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                      className={styles.thumbnailImage}
                    />

                    {/* Gradient Overlay */}
                    <div className={styles.frameOverlay} />

                    {/* Top Bar with Live Tag & Duration */}
                    <div className={styles.topBar}>
                      <span className={styles.tagBadge}>
                        <span className={styles.liveDot} />
                        {reel.tag}
                      </span>
                      <span className={styles.durationBadge}>
                        <Play size={10} fill="currentColor" />
                        {reel.duration}
                      </span>
                    </div>

                    {/* Center Animated Play Button */}
                    <div className={styles.playBtnWrapper}>
                      <div className={styles.playCircle}>
                        <Play size={20} fill="currentColor" className={styles.playIcon} />
                      </div>
                    </div>

                    {/* Bottom Info on Frame */}
                    <div className={styles.frameBottom}>
                      <span className={styles.metricPill}>{reel.metric}</span>
                      <p className={styles.quoteSnippet}>&ldquo;{reel.quoteSnippet}&rdquo;</p>
                    </div>

                    {/* Progress Bar Line */}
                    <div className={styles.progressBarTrack}>
                      <div className={styles.progressBarFill} />
                    </div>
                  </div>

                  {/* Under-Card Metadata: Person Name & Company Name only */}
                  <div className={styles.metaContainer}>
                    <div className={styles.personHeader}>
                      <h4 className={styles.personName}>{reel.name}</h4>
                      <span className={styles.verifiedCheck} title="Verified Client">
                        <Check size={10} strokeWidth={3.5} />
                      </span>
                    </div>

                    <div className={styles.companyRow}>
                      <span className={styles.companyName}>{reel.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className={styles.dotsWrapper}>
          {visibleDots.map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              className={`${styles.dot} ${idx === selectedIndex ? styles.dotActive : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Video Reel Modal Player */}
      {activeModalReel && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setActiveModalReel(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button with explicit Cross Icon */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setActiveModalReel(null)}
              aria-label="Close video player"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Background Reel Image */}
            <Image
              src={activeModalReel.thumbnail}
              alt={activeModalReel.name}
              fill
              className={styles.modalImage}
            />

            {/* Modal Overlay Details */}
            <div className={styles.modalOverlay}>
              <div className={styles.modalTopInfo}>
                <span className={styles.tagBadge}>
                  <span className={styles.liveDot} />
                  {activeModalReel.tag}
                </span>
                <span className={styles.metricPill}>{activeModalReel.metric}</span>
              </div>

              <div className={styles.modalCenterPlay}>
                <div className={styles.modalCenterCircle}>
                  <Play size={28} fill="currentColor" style={{ marginLeft: "4px" }} />
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.04em" }}>
                  WATCH FULL REEL ({activeModalReel.duration})
                </span>
              </div>

              <div className={styles.modalBottomInfo}>
                <h4 className={styles.modalClientName}>{activeModalReel.name}</h4>
                <p className={styles.modalClientCompany}>
                  {activeModalReel.company}
                </p>
                <p className={styles.modalQuote}>&ldquo;{activeModalReel.fullQuote}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoTestimonials;
