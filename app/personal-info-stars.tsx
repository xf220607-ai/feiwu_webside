const stars = [
  { id: "contact", title: "CONTACT", buttonLabel: "Contact information", position: "star-contact" },
  { id: "education", title: "CONTACT", buttonLabel: "Education information", position: "star-education" },
] as const;

export function PersonalInfoStars() {
  return (
    <div className="interactive-stars" aria-label="Personal information">
      {stars.map((star, index) => (
        <details className={`star-system ${star.position}`} key={star.id}>
          <summary className="star-button" aria-controls={`popover-${star.id}`}>
            <span aria-hidden="true">★</span><span className="sr-only">Show {star.buttonLabel}</span>
          </summary>
          <aside className="star-popover" id={`popover-${star.id}`}>
            <button className="popover-close" type="button" aria-label={`Close ${star.buttonLabel}`} data-star-close>×</button>
            <small>0{index + 1} / PERSONAL NOTE</small>
            <h2>{star.title}</h2>
            {star.id === "contact" ? (
              <address className="contact-details">
                <a href="mailto:fei.wu26@outlook.com">fei.wu26@outlook.com</a>
                <a href="tel:+8618704710206">+86 18704710206</a>
                <a href="tel:+61458420157">+61 458420157</a>
              </address>
            ) : (
              <div className="education-details">
                <div className="education-row"><span lang="zh-CN">澳大利亚国立大学</span><span>2026.7-2027.6</span></div>
                <div className="education-row"><span lang="zh-CN">华东政法大学</span><span>2022.9-2026.6</span></div>
              </div>
            )}
          </aside>
        </details>
      ))}
    </div>
  );
}
