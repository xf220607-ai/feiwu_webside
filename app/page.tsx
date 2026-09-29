import type { Metadata } from "next";
import { PersonalInfoStars } from "./personal-info-stars";
import { PortfolioScripts } from "./portfolio-scripts";

export const metadata: Metadata = {
  title: { absolute: "Fei Wu — Portfolio" },
  description: "A layered, mobile-first portfolio by Fei Wu.",
};

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-name">
        <div className="hero-background" aria-hidden="true">
          <img src="/assets/home/background/background.jpg" alt="" />
        </div>

        <h1 className="hero-name" id="hero-name"><span>Fei</span><span>Wu</span></h1>

        <div className="hero-portrait">
          <img
            src="/assets/home/portrait/fei-portrait.png"
            alt="Portrait of Fei Wu"
          />
        </div>

        <div className="hero-foreground" aria-hidden="true">
          <img src="/assets/home/foreground/foreground.png" alt="" />
        </div>

        <PersonalInfoStars />

        <a className="scroll-indicator" href="#my-works" aria-label="Scroll to My Works">
          <span /><span /><span />
        </a>
        <p className="hero-caption">Personal portfolio · layered composition study</p>
      </section>

      <section className="works-section" id="my-works" aria-labelledby="works-title">
        <header className="works-heading">
          <p className="eyebrow">Selected projects · rotate to explore</p>
          <h2 id="works-title">My works</h2>
        </header>

        <div className="carousel-shell" data-carousel tabIndex={0} aria-label="Circular project carousel">
          <div className="orbit-guide" aria-hidden="true" />
          <div className="project-orbit" data-project-orbit aria-live="polite" />
          <button className="carousel-control control-prev" type="button" data-carousel-prev aria-label="Previous project">←</button>
          <button className="carousel-control control-next" type="button" data-carousel-next aria-label="Next project">→</button>
          
        </div>

        <div className="active-project-meta" data-project-meta>
          <p>01 / 02</p><h3>Badge Lab</h3><span>Interactive Web · 2026</span>
          <span className="project-link" role="link" aria-disabled="true">View project <span aria-hidden="true">↗</span></span>
        </div>
      </section>

      <footer className="site-footer">
        <p>Fei Wu · Portfolio prototype</p><a href="mailto:fei.wu26@outlook.com">Let&apos;s talk ↗</a>
      </footer>
      <PortfolioScripts />
    </main>
  );
}
