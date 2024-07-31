import "./Hero.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import ScrollCTA from "../ScrollCTA/ScrollCTA";

gsap.registerPlugin(ScrollTrigger);

const HomeHero = () => {
  // Refs for animation elements
  const backgroundWrapper = useRef(null);
  const topSpans = [useRef(null), useRef(null), useRef(null)];
  const headings = [useRef(null), useRef(null), useRef(null)];
  const backgroundImage = useRef(null);
  const heroContainer = useRef(null);

  // Opening animation
  useEffect(() => {
    const backgroundWrapperEl = backgroundWrapper.current;

    // Background animation
    if (backgroundWrapperEl) {
      backgroundWrapperEl.style.transform = "translateY(0)";
    }

    // Animate top spans
    topSpans.forEach((spanRef, i) => {
      const spanEl = spanRef.current;
      if (spanEl) {
        gsap.fromTo(
          spanEl,
          { rotation: 10, opacity: 0, y: spanEl.clientHeight * 0.5 },
          {
            rotation: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.easeOut",
            delay: 0.6 + i / 20,
          }
        );
      }
    });

    // Animate headings
    headings.forEach((headingRef, i) => {
      const headingEl = headingRef.current;
      if (headingEl) {
        gsap.fromTo(
          headingEl,
          { rotation: 10, opacity: 0, y: headingEl.clientHeight * 0.5 },
          {
            rotation: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.easeOut",
            delay: 0.8 + i / 10,
          }
        );
      }
    });
  }, []);

  // Scroll Parallax
  useEffect(() => {
    const backgroundImageEl = backgroundImage.current;

    if (backgroundImageEl) {
      gsap.to(backgroundImageEl, {
        y: window.innerHeight * 2,
        opacity: 0.3,
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }
  }, []);

  // Cursor icon handlers
  const handleMouseMove = () => {
    if (window.cursorIcon) {
      const cursorIcon = window.cursorIcon;

      // Update cursor icon position based on mouse coordinates
      // cursorIcon.show("Scroll");
    }
  };

  const handleMouseLeave = () => {
    if (window.cursorIcon) {
      window.cursorIcon.hide();
    }
  };

  return (
    <div
      id="hero-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={heroContainer}
    >
      <ScrollCTA />
      <div className="content-width column">
        <div
          className="hero-background loading-transition"
          ref={backgroundWrapper}
        >
          <img
            src="/home/exo-ape-hero.webp"
            alt="exoape hero"
            ref={backgroundImage}
          />
        </div>
        <div className="top-span-container">
          <div className="anim">
            <span ref={topSpans[0]}>
              Intrigued by beauty, fascinated by technology
            </span>
          </div>
          <div className="anim">
            <span ref={topSpans[1]}>
              and fuelled with an everlasting devotion to digital
            </span>
          </div>
          <div className="anim">
            <span ref={topSpans[2]}>
              craftsmanship and meaningful aesthetics.
            </span>
          </div>
        </div>
        <h1>
          <div className="hero-title-anim">
            <p ref={headings[0]}>Digital</p>
          </div>
          <div className="hero-title-anim">
            <p ref={headings[1]}>Design</p>
          </div>
          <div className="hero-title-anim">
            <p ref={headings[2]}>Experience</p>
          </div>
        </h1>
        <span className="bottom-span">
          White-glove digital experiences, engaging
          <br />
          content and impactful design solutions that
          <br />
          inspire, affect and delight. We carefully wrap
          <br />
          emotionally rich aesthetics around strategic
          <br />
          concepts to deliver award-winning digital
          <br />
          design that exceeds expectations.
        </span>
      </div>
    </div>
  );
};

export default HomeHero;
