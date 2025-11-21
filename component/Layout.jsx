import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { SITE } from '../content/siteConfig';

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", to: "/" },
    { label: "Schedule", to: "/schedule" },
    { label: "Travel", to: "/travel" },
    { label: "Stay", to: "/stay" },
    { label: "RSVP", to: "/rsvp" },
    { label: "Things To Do", to: "/things-to-do" },
    { label: "FAQ", to: "/faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div
        className="px-4 py-2 text-center text-sm bg-amber-100 text-amber-900 border-b border-amber-200"
        aria-live="polite"
      >
        Ceremony will be on the beach 🌊 at <strong>Manatee Public Beach (28th St, Holmes Beach)</strong>
        <span
          className="ml-2 inline-block align-middle w-2 h-2 rounded-full bg-amber-600"
          style={{ animation: "blink 1s steps(2, start) infinite" }}
          aria-hidden="true"
        />
      </div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>

      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="font-semibold tracking-wide">
          Our Wedding
        </NavLink>

        <button
          className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-xl bg-gray-800 text-white focus:outline-none focus:ring"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="nav-links"
        >
          <span className="text-sm font-medium">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <ul id="nav-links" className={`md:flex md:gap-5 ${open ? "block" : "hidden"} md:block`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block py-2 md:py-0 hover:underline ${isActive ? "font-medium" : ""}`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f4ef] text-zinc-900">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      <footer className="px-4 py-10 text-center text-sm opacity-70">
        © {new Date().getFullYear()} {SITE.couple}
      </footer>
    </div>
  );
}
