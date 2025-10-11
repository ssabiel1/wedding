// src/pages/RSVPThanks.jsx
import { useEffect } from 'react';

export default function RSVPThanks() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.onload = () => {
      if (window.confetti) {
        const duration = 1200;
        const end = Date.now() + duration;
        (function frame() {
          window.confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
          window.confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      }
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="rounded-2xl overflow-hidden shadow bg-white">
        <div className="w-full h-48 sm:h-56 bg-gradient-to-r from-rose-100 via-pink-100 to-sky-100" aria-hidden />
        <div className="p-6 text-center space-y-5">
          <h1 className="text-3xl font-serif">Thank you!</h1>
          <p className="opacity-80">
            Thanks for your RSVP. We’ll miss celebrating with you but really appreciate you letting us know.
          </p>
          <p className="text-sm opacity-70">If your plans change, you can submit the form again anytime.</p>
        </div>
      </div>
      <div className="relative mt-6 h-0">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 text-2xl select-none" aria-hidden>🎉</div>
      </div>
    </div>
  );
}
