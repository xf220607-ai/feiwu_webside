"use client";

import { useEffect } from "react";

function loadScript(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
    document.body.appendChild(script);
  });
}

export function PortfolioScripts() {
  useEffect(() => {
    loadScript("portfolio-project-data", "/js/projects.js?v=20260929-1")
      .then(() => loadScript("portfolio-interactions", "/js/animations.js?v=20260929-1"))
      .catch((error) => console.error(error));
  }, []);

  return null;
}
