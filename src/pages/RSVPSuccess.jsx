// src/pages/RSVPSuccess.jsx
import { useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import { SITE } from '../content/siteConfig';
import heroImg from '../img/IMG_3892.jpg';
import { createICSBlob } from '../utils/ics';

// --- Add these helpers (same behavior as Schedule) ---
const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const fmtICS = (d) =>
  new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

const icsString = ({ title, start, end, location }) => {
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Site//RSVP Success//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@wedding`,
    `DTSTAMP:${fmtICS(Date.now())}`,
    `DTSTART:${fmtICS(start)}`,
    `DTEND:${fmtICS(end)}`,
    `SUMMARY:${title}`,
    location ? `LOCATION:${location}` : null,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n') + '\r\n';
};
const icsDataUrl = (event) =>
  "data:text/calendar;charset=utf-8," + encodeURIComponent(icsString(event));

const googleUrl = ({ title, start, end, location }) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmtICS(start)}/${fmtICS(end)}`,
    location: location || '',
    details: 'Added from the wedding site',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
// ------------------------------------------------------

export default function RSVPSuccess() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = () => {
      if (window.confetti) {
        const duration = 1500;
        const end = Date.now() + duration;
        (function frame() {
          window.confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
          window.confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      }
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const ceremony = SITE?.schedule?.[0];

  const addToCalendar = () => {
    if (!ceremony) return;
    const title = `${SITE.couple} — ${ceremony.title}`;
    const location = SITE.venue?.name || SITE.city || '';

    if (isIOS()) {
      // iPhone/iPad: open data URL so Calendar sheet appears
      const dataUrl = 'data:text/calendar;charset=utf-8,' +
        encodeURIComponent(icsString({ title, start: ceremony.start, end: ceremony.end, location }));
      window.location.href = dataUrl; // or window.open(dataUrl, '_blank')
      return;
    }

    // Others: standard Blob download/open
    const blob = createICSBlob({
      title,
      start: ceremony.start,
      end: ceremony.end,
      location,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ceremony.title}.ics`.replace(/[\\/:*?"<>|]/g, '_');
    a.type = 'text/calendar';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const datePretty = ceremony
    ? new Date(ceremony.start).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      })
    : '';

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="rounded-2xl overflow-hidden shadow bg-white">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Couple"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 4%' }}
          />
        </div>

        <div className="p-6 text-center space-y-5">
          <h1 className="text-3xl font-serif">Thank you!</h1>

          <p className="opacity-80">
            We’ve received your RSVP{SITE?.couple ? ` for ${SITE.couple}` : ''}.
            {datePretty && <> See you around <span className="font-medium">{datePretty}</span>!</>}
          </p>

          {/* Primary actions: compact & stacked */}
          {ceremony && (
            <div className="flex flex-col items-center gap-1">
              {/* Universal: data URL works on iOS and desktop */}
              <a
                href={icsDataUrl({
                  title: `${SITE.couple} — ${ceremony.title}`,
                  start: ceremony.start,
                  end: ceremony.end,
                  location: SITE.venue?.name || SITE.city || '',
                })}
                download={`${ceremony.title}.ics`.replace(/[\\/:*?"<>|]/g, "_")}
                className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-white text-[11px] font-normal shadow-sm whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
                aria-label="Add ceremony to your calendar"
              >
                <span aria-hidden className="mr-1 text-xs">📅</span>
                Add to Calendar
              </a>

              <a
                href={googleUrl({
                  title: `${SITE.couple} — ${ceremony.title}`,
                  start: ceremony.start,
                  end: ceremony.end,
                  location: SITE.venue?.name || SITE.city || '',
                })}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border border-green-200 text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-green-300"
              >
                Add to Google
              </a>
            </div>
          )}


          {/* Secondary actions: all site links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <NavLink to="/" className="px-5 py-2.5 rounded-full border bg-white hover:bg-gray-50">Home</NavLink>
            <NavLink to="/schedule" className="px-5 py-2.5 rounded-full border bg-white hover:bg-gray-50">Schedule</NavLink>
            <NavLink to="/travel" className="px-5 py-2.5 rounded-full border bg-white hover:bg-gray-50">Travel</NavLink>
            <NavLink to="/stay" className="px-5 py-2.5 rounded-full border bg-white hover:bg-gray-50">Stay</NavLink>
            <NavLink to="/things-to-do" className="px-5 py-2.5 rounded-full border bg-white hover:bg-gray-50">Things To Do</NavLink>
            <NavLink to="/faq" className="px-5 py-2.5 rounded-full border bg-white hover:bg-gray-50">FAQ</NavLink>
            <NavLink to="/rsvp" className="px-5 py-2.5 rounded-full border bg-white hover:bg-gray-50">Edit RSVP</NavLink>
          </div>
        </div>
      </div>

      {/* subtle confetti emoji fallback if CDN blocked */}
      <div className="relative mt-6 h-0">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 text-2xl select-none" aria-hidden>
          🎉
        </div>
      </div>
    </div>
  );
}
