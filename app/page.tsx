import type { Metadata } from "next";
import { PortfolioScripts } from "./portfolio-scripts";

export const metadata: Metadata = {
  title: { absolute: "Fei Wu — Portfolio" },
  description: "A layered, mobile-first portfolio by Fei Wu.",
};

const stars = [
  { id: "email", label: "Email", content: "Say hello or ask about a collaboration.", position: "star-email" },
  { id: "education", label: "Education", content: "Education details placeholder — add institution, degree, and year.", position: "star-education" },
  { id: "internship", label: "Internship Experience", content: "Internship placeholder — add role, studio, and a concise contribution.", position: "star-internship" },
];

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

        <div className="interactive-stars" aria-label="Personal information">
          {stars.map((star, index) => (
            <div className={`star-system ${star.position}`} key={star.id}>
              <button className="star-button" type="button" aria-expanded="false" aria-controls={`popover-${star.id}`}>
                <span aria-hidden="true">★</span><span className="sr-only">Show {star.label}</span>
              </button>
              <aside className="star-popover" id={`popover-${star.id}`} hidden>
                <button className="popover-close" type="button" aria-label={`Close ${star.label}`}>×</button>
                <small>0{index + 1} / PERSONAL NOTE</small>
                <h2>{star.label}</h2>
                <p>{star.content}</p>
                {star.id === "email" && <a href="mailto:hello@example.com">hello@example.com</a>}
              </aside>
            </div>
          ))}
        </div>

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
          <p className="carousel-instruction"><span className="mobile-copy">Swipe or tap arrows</span><span className="desktop-copy">Drag, scroll, or use arrow keys</span></p>
        </div>

        <div className="active-project-meta" data-project-meta>
          <p>01 / 04</p><h3>Badge Lab</h3><span>Interactive Web · 2026</span>
          <a href="/project-badge-lab">View project <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <p>Fei Wu · Portfolio prototype</p><a href="mailto:hello@example.com">Let&apos;s talk ↗</a>
      </footer>
      <PortfolioScripts />
    </main>
  );
}
