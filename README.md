# Fei Wu — personal portfolio prototype

A mobile-first portfolio prototype based on the supplied low-fidelity Figma composition. The site keeps the home page as a continuous layered Hero + My Works experience and includes the first full Badge Lab case-study route.

The supplied reference images are **not** bundled as production assets. Every missing final visual is shown as an obvious placeholder so it can be replaced without changing the layout.

## Start the site locally

1. Install Node.js 22.13 or newer.
2. In this folder, run `npm install` once.
3. Run `npm run dev`.
4. Open the local address shown in the terminal (normally `http://localhost:3000`).

Run `npm run build` to check the production build.

## Project map

- `app/page.tsx` — semantic HTML structure for the portfolio home page
- `app/project-badge-lab/page.tsx` — Badge Lab case-study modules
- `app/globals.css` — mobile-first layout, visual layers, responsive rules, and motion styling
- `public/js/projects.js` — editable project data
- `public/js/animations.js` — vanilla JavaScript for stars, parallax, carousel, and project CTA
- `public/assets/` — replaceable image folders

## 1. Replace the Hero background

Put the file in `public/assets/home/background/`, for example `hero-background.jpg`.

In `app/page.tsx`, replace the content inside `.hero-background` with:

```html
<img src="/assets/home/background/hero-background.jpg" alt="" />
```

Then add this to `.hero-background` in `app/globals.css`:

```css
.hero-background img { width: 100%; height: 100%; object-fit: cover; }
```

Keep the `.hero-background` class because the scroll separation reads that class.

## 2. Replace the Portrait

Put a transparent PNG or WebP in `public/assets/home/portrait/`. Replace the placeholder content inside `.hero-portrait` with an image:

```html
<img src="/assets/home/portrait/fei-portrait.webp" alt="Portrait of Fei Wu" />
```

Set the image to `width: 100%; height: 100%; object-fit: contain;`. Remove the placeholder background, border, and `clip-path` only after the real cut-out image is in place. Keep `.hero-portrait` as the animation hook.

## 3. Replace the Foreground

Put the image in `public/assets/home/foreground/` and replace the placeholder content inside `.hero-foreground` in the same way. A transparent PNG or WebP works best. Keep `.hero-foreground` as its independent DOM layer.

## 4. Add or edit Star information

Open `app/page.tsx` and edit the `stars` array near the top. Every entry needs:

- `id` — unique, lowercase value
- `label` — popover title
- `content` — popover copy
- `position` — a CSS class such as `star-email`

To add a fifth star, add an entry and then position its class in `app/globals.css`. The open/close behavior is automatic. Update the placeholder email address in both `app/page.tsx` and the footer.

## 5. Add a Portfolio project

Open `public/js/projects.js`, duplicate one project object, and change:

- `id`
- `title`
- `category`
- `year`
- `cover`
- `coverColor`
- `description`
- `projectPage`
- `externalWebsite`

The carousel is generated from this array. For a final cover, put the image under `public/assets/projects/<project-id>/cover/` and set `cover` to its public path, for example `/assets/projects/badge-lab/cover/cover.webp`.

## 6. Change the Badge Lab external link

In `public/js/projects.js`, set the Badge Lab `externalWebsite` value:

```js
externalWebsite: "https://your-real-badge-lab-url.example",
```

Once a real URL is present, the circular CTA automatically opens it in a new tab with safe `noopener noreferrer` attributes. While it is empty, clicking shows a visible placeholder note instead of opening a fake site.

## 7. Add a Case Study section

Open `app/project-badge-lab/page.tsx` and add an object to `caseStudySections`:

```js
{
  number: "12",
  title: "Next Step",
  text: "Section description.",
  kind: "text"
}
```

The page maps each object into the same accessible, responsive module. Add a specific class such as `.case-next-step` in `app/globals.css` when that section needs a custom collage, diagram, or screenshot layout.

## Motion and accessibility

- All star controls are keyboard buttons with expanded state and Escape-to-close behavior.
- The carousel supports swipe/drag, wheel, arrow buttons, and keyboard arrow keys.
- Smooth scroll and parallax are disabled when `prefers-reduced-motion: reduce` is enabled.
- Final image alternatives should be descriptive for meaningful images and empty for decorative images.
