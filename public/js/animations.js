(function () {
  "use strict";

  const projects = window.PORTFOLIO_PROJECTS || [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initStars() {
    const systems = Array.from(document.querySelectorAll("details.star-system"));
    if (!systems.length) return;

    const closeAll = (except) => {
      systems.forEach((system) => {
        if (system !== except) system.open = false;
      });
    };

    systems.forEach((system) => {
      const summary = system.querySelector(".star-button");
      const close = system.querySelector("[data-star-close]");

      system.addEventListener("toggle", () => {
        if (system.open) closeAll(system);
      });

      close.addEventListener("click", () => {
        system.open = false;
        summary.focus();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAll();
    });
    document.addEventListener("pointerdown", (event) => {
      if (!event.target.closest(".star-system")) closeAll();
    });
  }

  function initHeroParallax() {
    const hero = document.querySelector(".hero");
    if (!hero || reducedMotion.matches) return;
    const background = hero.querySelector(".hero-background");
    const name = hero.querySelector(".hero-name");
    const portrait = hero.querySelector(".hero-portrait");
    const foreground = hero.querySelector(".hero-foreground");
    let ticking = false;

    const update = () => {
      const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
      background.style.transform = `translate3d(0, ${progress * 18}px, 0)`;
      name.style.transform = `translate3d(0, ${progress * 28}px, 0)`;
      name.style.opacity = String(1 - progress * 0.28);
      portrait.style.transform = `translate3d(${progress * 10}px, ${progress * 8}px, 0)`;
      foreground.style.transform = `translate3d(0, ${progress * -24}px, 0)`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  function createProjectObject(project, index) {
    const article = document.createElement("article");
    article.className = "project-object";
    article.dataset.projectIndex = String(index);
    article.innerHTML = `
      <a ${project.url ? `href="${project.url}"` : 'aria-disabled="true" tabindex="-1"'} aria-label="Open ${project.title} project">
        <div class="project-disc" aria-hidden="true"></div>
        <div class="project-cover" style="--cover:${project.coverColor}">
          <strong>${project.title}</strong>
        </div>
      </a>`;
    if (project.cover) {
      article.querySelector(".project-cover").style.backgroundImage = `url('${project.cover}')`;
      article.querySelector(".project-cover").style.backgroundSize = "cover";
    }
    article.addEventListener("click", (event) => {
      if (!article.classList.contains("is-active")) {
        event.preventDefault();
        select(index);
      } else if (!project.url) {
        event.preventDefault();
      }
    });
    return article;
  }

  let select = function () {};

  function initCarousel() {
    const shell = document.querySelector("[data-carousel]");
    const orbit = document.querySelector("[data-project-orbit]");
    const meta = document.querySelector("[data-project-meta]");
    if (!shell || !orbit || !meta || !projects.length) return;

    projects.forEach((project, index) => orbit.appendChild(createProjectObject(project, index)));
    const items = Array.from(orbit.querySelectorAll(".project-object"));
    let active = 0;
    let pointerStart = null;
    let wheelLocked = false;

    const shortestOffset = (index) => {
      let value = index - active;
      const half = projects.length / 2;
      if (value > half) value -= projects.length;
      if (value < -half) value += projects.length;
      return value;
    };

    const render = () => {
      const desktop = window.innerWidth >= 760;
      items.forEach((item, index) => {
        const offset = shortestOffset(index);
        const angle = offset * (desktop ? 52 : 65);
        const radians = angle * Math.PI / 180;
        const radiusX = desktop ? Math.min(window.innerWidth * .26, 330) : window.innerWidth * .37;
        const radiusY = desktop ? 115 : 82;
        const x = Math.sin(radians) * radiusX;
        const y = (1 - Math.cos(radians)) * radiusY;
        const depth = Math.cos(radians);
        const scale = Math.max(.48, .72 + depth * .28);
        item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${offset * -5}deg)`;
        item.style.opacity = String(Math.max(.18, .45 + depth * .55));
        item.style.filter = `saturate(${Math.max(.5, depth)})`;
        item.style.zIndex = String(Math.round((depth + 1) * 10));
        item.classList.toggle("is-active", index === active);
        item.setAttribute("aria-hidden", String(index !== active));
      });
      const project = projects[active];
      const projectLink = project.url
        ? `<a class="project-link" href="${project.url}">View project <span aria-hidden="true">↗</span></a>`
        : '<span class="project-link" role="link" aria-disabled="true">View project <span aria-hidden="true">↗</span></span>';
      const websiteLink = project.externalWebsite
        ? `<a class="project-url" href="${project.externalWebsite}">${project.externalWebsite}</a>`
        : "";
      meta.innerHTML = `<p>${String(active + 1).padStart(2,"0")} / ${String(projects.length).padStart(2,"0")}</p><h3>${project.title}</h3><span>${project.category} · ${project.year}</span>${websiteLink}${projectLink}`;
    };

    select = (index) => { active = (index + projects.length) % projects.length; render(); };
    const previous = () => select(active - 1);
    const next = () => select(active + 1);
    shell.querySelector("[data-carousel-prev]").addEventListener("click", previous);
    shell.querySelector("[data-carousel-next]").addEventListener("click", next);
    shell.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
      if (event.key === "ArrowRight") { event.preventDefault(); next(); }
    });
    shell.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button, a")) return;
      pointerStart = event.clientX;
      shell.setPointerCapture(event.pointerId);
    });
    shell.addEventListener("pointerup", (event) => {
      if (pointerStart === null) return;
      const delta = event.clientX - pointerStart;
      if (Math.abs(delta) > 35) delta > 0 ? previous() : next();
      pointerStart = null;
    });
    shell.addEventListener("wheel", (event) => {
      if (wheelLocked || Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      wheelLocked = true;
      event.deltaY > 0 ? next() : previous();
      window.setTimeout(() => { wheelLocked = false; }, 450);
    }, { passive: false });
    window.addEventListener("resize", render);
    render();
  }

  function initProjectCTA() {
    const visitLink = document.querySelector("[data-visit-project]");
    if (!visitLink) return;
    const badgeLab = projects.find((project) => project.id === "badge-lab");
    if (badgeLab && badgeLab.externalWebsite) {
      visitLink.href = badgeLab.externalWebsite;
      visitLink.target = "_blank";
      visitLink.rel = "noopener noreferrer";
    } else {
      visitLink.addEventListener("click", (event) => {
        event.preventDefault();
        const note = document.querySelector(".link-placeholder-note");
        note.hidden = false;
        note.focus?.();
      });
    }
  }

  initStars();
  initHeroParallax();
  initCarousel();
  initProjectCTA();
})();
