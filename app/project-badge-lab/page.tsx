import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: { absolute: "Badge Lab — Fei Wu" },
  description: "Badge Lab project case study by Fei Wu.",
};

const caseStudySections = [
  { number: "01", title: "Overview", text: "Badge Lab is a playful web experience for making and collecting personal digital badges. Replace this placeholder with the final project introduction.", kind: "text" },
  { number: "02", title: "Problem / Pain Point", text: "What was difficult for the user, what triggered the project, and why a browser-based badge maker became the right response.", kind: "note" },
  { number: "03", title: "User", text: "Describe the primary audience, their context, and what they want to express or achieve through the experience.", kind: "profile" },
  { number: "04", title: "Design Goal", text: "State the experience goal and the principles used to keep badge creation quick, playful, and legible.", kind: "text" },
  { number: "05", title: "Research / References", text: "Add visual references, comparable experiences, annotated screenshots, and the ideas taken from each source.", kind: "collage" },
  { number: "06", title: "User Flow", text: "Replace the workflow placeholder below with the final customer journey diagram.", kind: "workflow" },
  { number: "07", title: "Low-fidelity Wireframe", text: "Add early structure, interaction notes, and the decisions that changed after testing.", kind: "wireframe" },
  { number: "08", title: "High-fidelity Design", text: "Add the finished screen system, key states, visual language, and responsive variations.", kind: "screens" },
  { number: "09", title: "Development", text: "Document the HTML, CSS, JavaScript, and AI-assisted coding process, including constraints and technical decisions.", kind: "code" },
  { number: "10", title: "Final Result", text: "Add final screenshots, GIFs, and demo links when the project assets are ready.", kind: "result" },
  { number: "11", title: "Reflection", text: "Summarise what worked, what changed, what you learned, and what the next iteration should improve.", kind: "reflection" },
];

export default function BadgeLabPage() {
  return (
    <main className="project-page" data-project-page="badge-lab">
      <div className="project-background-placeholder" aria-hidden="true">BADGE LAB DETAIL BACKGROUND</div>
      <header className="project-hero">
        <a className="back-link" href="/">← Back to works</a>
        <p className="project-kicker">Web design · Interactive experience · 2026</p>
        <h1>Let&apos;s make<br /><span>Badges!</span></h1>
        <a className="visit-badge" href="#external-link-placeholder" data-visit-project aria-label="Visit the Badge Lab website">
          <span>Visit<br />web<br />now</span>
          <small>↗</small>
        </a>
        <p className="link-placeholder-note" id="external-link-placeholder" hidden>
          External website URL placeholder — replace it in <code>public/js/projects.js</code>.
        </p>
        <p className="project-intro">A modular, scroll-based case study shell ready for the finished Badge Lab story and visual assets.</p>
      </header>

      <div className="case-study" aria-label="Badge Lab case study">
        {caseStudySections.map((section) => (
          <section className={`case-section case-${section.kind}`} key={section.number} aria-labelledby={`case-${section.number}`}>
            <div className="case-heading">
              <span>{section.number}</span>
              <h2 id={`case-${section.number}`}>{section.title}</h2>
            </div>
            <div className="case-content">
              <p>{section.text}</p>
              {section.kind === "workflow" ? (
                <div className="project-workflow asset-placeholder" role="img" aria-label="Customer workflow image placeholder">
                  <span>CUSTOMER WORKFLOW</span><small>Replace with workflow image</small>
                </div>
              ) : (
                <div className="case-asset asset-placeholder" role="img" aria-label={`${section.title} visual placeholder`}>
                  <span>{section.title.toUpperCase()} VISUAL</span><small>Optional image / diagram / collage</small>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <footer className="project-footer">
        <a href="/">← Return to portfolio</a><p>Fei Wu · Portfolio prototype</p>
      </footer>
      <Script src="/js/projects.js" strategy="afterInteractive" />
      <Script src="/js/animations.js" strategy="afterInteractive" />
    </main>
  );
}
