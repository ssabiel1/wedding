// src/pages/RSVPSuccess.jsx
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SITE } from "../content/siteConfig";
import { createICSBlob } from "../utils/ics";
import heroImg from "../img/IMG_3892.jpg";

export default function RSVPSuccess() {
  useEffect(() => {
    // Load canvas-confetti lazily for a little celebration (no build dependency)
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.onload = () => {
      if (window.confetti) {
        const duration = 1500;
        const end = Date.now() + duration;
        (function frame() {
          window.confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          window.confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const ceremony = SITE?.schedule?.[0];
  const addToCalendar = () => {
    if (!ceremony) return;
    const blob = createICSBlob({
      title: `${SITE.couple} — ${ceremony.title}`,
      start: ceremony.start,
      end: ceremony.end,
      location: SITE.venue?.name || SITE.city || ""
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ceremony.title}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const datePretty = ceremony
    ? new Date(ceremony.start).toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/New_York",
      })
    : "";

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="rounded-2xl overflow-hidden shadow bg-white">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Couple"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 4%" }}
          />
        </div>
        <div className="p-6 text-center space-y-4">
          <h1 className="text-3xl font-serif">Thank you!</h1>
          <p className="opacity-80">
            We’ve received your RSVP{SITE?.couple ? ` for ${SITE.couple}` : ""}.
            {datePretty && <> See you around <span className="font-medium">{datePretty}</span>!</>}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={addToCalendar} className="px-5 py-3 border rounded-xl hover:shadow w-full sm:w-auto">
              Add Ceremony to Calendar
            </button>
            <NavLink to="/things-to-do" className="px-5 py-3 border rounded-xl hover:shadow w-full sm:w-auto text-center">
              Things To Do
            </NavLink>
            <NavLink to="/" className="px-5 py-3 border rounded-xl hover:shadow w-full sm:w-auto text-center">
              Back to Home
            </NavLink>
          </div>
        </div>
      </div>

      {/* subtle confetti emoji fallback if CDN blocked */}
      <div className="relative mt-6 h-0">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 text-2xl select-none" aria-hidden>🎉</div>
      </div>
    </div>
  );
}
