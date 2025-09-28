# Wedding Site Starter (React + Vite + Tailwind + Router)

This is a plug-and-play starter for your wedding website. Import the folder into Visual Studio / VS Code and run.

## Quickstart
```bash
npm install
npm run dev
```
Open the local URL from the terminal.

## Build
```bash
npm run build
npm run preview
```

## Edit your details
- Update `src/content/siteConfig.js` (names, date, venue, hotels).
- Replace the hero image `src/App.jsx` `<img src=...>` with your photo.
- RSVP is wired for **Netlify Forms** (no backend). If deploying to Netlify, enable Forms in the dashboard.
- ICS "Add to Calendar" links are generated on the Schedule page.

## Deploy
- **Netlify:** New Site from Git → build: `npm run build`, publish dir: `dist`.
- **Vercel:** Import repo → Framework: Vite.


## Deploy to Netlify
1. Push this project to GitHub.
2. In Netlify, click **New site from Git** → pick your repo.
3. Build command: `npm run build`  •  Publish directory: `dist`
4. `netlify.toml` is already included for React Router redirects.

## RSVP Email Notifications (EmailJS)
- Install deps: `npm install`
- Copy `.env.example` → `.env` and set:
```
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
```
- In EmailJS, create a Service & Template (variables like `name`, `email`, `attending`, `guests`, `meal`, `allergies`, `song`, `code`).
- Run locally: `npm run dev` and submit the RSVP form — you should receive an email.
