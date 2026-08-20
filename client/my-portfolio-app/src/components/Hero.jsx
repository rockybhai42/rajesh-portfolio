import { Suspense, lazy, useEffect, useState } from "react";
import "../styles/hero.css";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useDeviceCapability } from "../hooks/useDeviceCapability";
import SceneFallback from "./3d/SceneFallback";
import profileImage from "../assets/my_image.png";

const HeroScene = lazy(() => import("./3d/HeroScene"));

function Hero({ theme }) {
  const prefersReducedMotion = useReducedMotion();
  const capability = useDeviceCapability(prefersReducedMotion);
  const [accentColor, setAccentColor] = useState("#38bdf8");

  useEffect(() => {
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    if (computed) setAccentColor(computed);
  }, [theme]);

  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <img src={profileImage} alt="Rajesh Kumar" className="hero-avatar" />

        <h1>
          Rajesh Kumar
          <span className="hero-role">Full-Stack Web Developer</span>
        </h1>

        <p>
          I build custom web applications that solve real business
          problems — from billing systems and management dashboards to
          staff workflow tools, backed by React, Node.js and Express.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="hero-btn hero-btn-primary">
            View My Work
          </a>

          <a href="#contact" className="hero-btn hero-btn-secondary">
            Contact Me
          </a>
        </div>

        <div className="hero-resume-links">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            View Resume
          </a>
          <span className="hero-resume-divider" aria-hidden="true">
            ·
          </span>
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </div>
      </div>

      <div className="hero-right">
        {capability === "off" ? (
          <SceneFallback />
        ) : (
          <Suspense fallback={<SceneFallback />}>
            <div className="hero-canvas">
              <HeroScene accentColor={accentColor} capability={capability} />
            </div>
          </Suspense>
        )}
      </div>
    </section>
  );
}

export default Hero;
