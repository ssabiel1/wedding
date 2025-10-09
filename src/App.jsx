import { useState } from 'react';

import {
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';

import { SITE } from './content/siteConfig';
import heroImg from './img/IMG_3892.jpg';
import NavCard from './pages/NavCard.jsx';
import RSVP from './pages/RSVP.jsx';
import RSVPSuccess from './pages/RSVPSuccess.jsx';
import Stay from './pages/Stay.jsx';
import ThingsToDo from './pages/ThingsToDo.jsx';
import { createICSBlob } from './utils/ics';

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Schedule', to: '/schedule' },
    { label: 'Travel', to: '/travel' },
    { label: 'Stay', to: '/stay' },
    { label: 'RSVP', to: '/rsvp' },
    { label: "Things To Do", to: "/things-to-do" },
    { label: 'FAQ', to: '/faq' },
  ];
  
  return (
    <nav className='sticky top-0 z-50 border-b bg-white/80 backdrop-blur'>
    {/* Announcement bar */}
      <div
        className="px-4 py-2 text-center text-sm bg-amber-100 text-amber-900 border-b border-amber-200"
        aria-live="polite"
      >
        Ceremony will be on the beach 🌊 — final spot will be shared here soon
        <span
          className="ml-2 inline-block align-middle w-2 h-2 rounded-full bg-amber-600"
          style={{ animation: 'blink 1s steps(2, start) infinite' }}
          aria-hidden="true"
        />
      </div>

      {/* Tiny CSS for blink animation */}
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      <div className='max-w-4xl mx-auto px-4 py-3 flex items-center justify-between'>
        <NavLink to='/' className='font-semibold tracking-wide'>
          Our Wedding
        </NavLink>

        {/* Refactored mobile menu button */}
        <button
          className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-xl bg-gray-800 text-white focus:outline-none focus:ring"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="nav-links"
        >
          <span className="text-sm font-medium">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <ul
          id='nav-links'
          className={`md:flex md:gap-5 ${open ? 'block' : 'hidden'} md:block`}
        >
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block py-2 md:py-0 hover:underline ${
                    isActive ? 'font-medium' : ''
                  }`
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
  )
}
export function Layout({ children }) {
  return (
    <div className='min-h-screen bg-[#f7f4ef] text-zinc-900'>
      <Nav />
      <main className='max-w-4xl mx-auto px-4 py-8'>{children}</main>
      <footer className='px-4 py-10 text-center text-sm opacity-70'>© {new Date().getFullYear()} {SITE.couple}</footer>
    </div>
  )
}

function Home() {
  const date = new Date(SITE.dateISO);
  const pretty = date.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Layout>
      <header className="text-center space-y-4">
        <div className="rounded-2xl overflow-hidden shadow aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/9]">
          <img
            src={heroImg}
            alt="Jamie & Sarah"
            className="h-full w-full object-cover object-[50%_6%] sm:object-[50%_12%] md:object-center"
            style={{ objectPosition: "50% 30%" }} // <- show more top (0% = very top)
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif">
          {SITE.couple}
        </h1>
        <p className="text-base sm:text-lg opacity-80">
          {pretty} • {SITE.city}
        </p>

        {/* Highlighted RSVP button */}
        <NavLink
          to="/rsvp"
          className="inline-block w-full sm:w-auto px-8 py-4 rounded-full bg-pink-600 text-white font-semibold shadow-lg hover:bg-pink-700 hover:shadow-xl transition"
        >
          RSVP Now
        </NavLink>
      </header>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <ScheduleCard />
        <TravelCard />
        <StayCard />
        <ThingsToDoCard />
      </section>
      
      <section className="mt-10 text-center">
        <p className="text-lg sm:text-xl text-gray-800 font-serif">
          Have more questions?{" "}
          <NavLink
            to="/faq"
            className="text-[#2d3e50] font-semibold underline hover:text-[#1f2d3d] transition-colors"
          >
            View FAQs
          </NavLink>
        </p>
      </section>

    </Layout>
  );
}

function Schedule() {
  return (
    <Layout>
      <h1 className="text-2xl font-serif mb-6 text-rose-800">Schedule</h1>

      <ul className="space-y-3">
        {SITE.schedule.map((ev) => {
          const url = URL.createObjectURL(
            createICSBlob({
              title: ev.title,
              start: ev.start,
              end: ev.end,
              location: ev.location || SITE.venue?.name || SITE.city,
            })
          );

          return (
            <li key={ev.title} className="border rounded-xl p-4 space-y-2 bg-white/60">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  {/* Title in accent color */}
                  <div className="font-medium text-rose-700">{ev.title}</div>

                  {/* Location muted */}
                  <div className="text-sm text-gray-600">
                    {ev.location || SITE.venue?.name}
                  </div>
                </div>

                {/* Time neutral */}
                <div className="text-sm text-gray-700">
                  {new Date(ev.start).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "America/New_York",
                  })}
                  {" – "}
                  {new Date(ev.end).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "America/New_York",
                  })}{" "}
                  EST
                </div>

                {/* Add to Calendar link highlighted */}
                <a
                  href={url}
                  download={`${ev.title}.ics`}
                  className="text-sm underline w-full sm:w-auto text-center text-indigo-600 hover:text-indigo-800"
                >
                  Add to Calendar
                </a>
              </div>

              {ev.notes && (
                <p className="text-sm italic text-gray-600 border-l-2 border-gray-300 pl-3 mt-1">
                  {ev.notes}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}


function Travel(){
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.venue.address)}`;
  const trans = 'https://annamariarentals.com/activities/anna-maria-island-bus-services/';
  const BASE_ADDR = "310 81st St W, Bradenton, FL 34209, USA";

  const mapLinks = [
    { label: "Coquina Beach", q: "Coquina Beach" },
    { label: "Bradenton Beach", q: "Bradenton Beach" },
    { label: "Bridge Street (Bradenton Beach)", q: "Bridge Street, Bradenton Beach" },
    { label: "Anna Maria City Pier", q: "Anna Maria City Pier" },
    { label: "Manatee Public Beach", q: "Manatee Public Beach" },
    { label: "Bean Point", q: "Bean Point" },
  ];

  const eatsAndBars = [
    { label: "Daiquiri Deck (Bradenton Beach)", q: "Daiquiri Deck Bradenton Beach" },
    { label: "Bridge Tender Inn", q: "Bridge Tender Inn Bradenton Beach" },
    { label: "Island Time Bar & Grill", q: "Island Time Bar & Grill Bradenton Beach" },
    { label: "Beach House Waterfront Restaurant", q: "Beach House Bradenton Beach" },
    { label: "The Sandbar Restaurant", q: "Sandbar Restaurant Anna Maria" },
    { label: "Rod & Reel Pier", q: "Rod & Reel Pier Anna Maria" },
    { label: "Drift Inn", q: "Drift Inn Bradenton" },
    // Add more tiki bars if you have favorites:
    { label: "Tiki Bars near Coquina Beach", q: "tiki bar near Coquina Beach" },
    { label: "Tiki Bars on Anna Maria Island", q: "tiki bar Anna Maria Island" },
  ];
  return (
    <Layout>
      <h1 className='text-2xl font-serif mb-6'>Travel</h1>
      <p className='mb-3'><span className='font-bold'>Venue:</span> {SITE.venue.name}</p>
      <a className='underline' href={gmaps} target='_blank' rel='noreferrer'>Open in Google Maps</a>
      <ul className='list-disc pl-6 mt-4 space-y-1'>
        {SITE.travelTips.map((tip, i) =>  typeof tip === "string" ? (<li key={i}>{tip}</li>) : ( <li key={i}> {tip.text}{" "}  <a href={tip.link.to} className="underline"> {tip.link.label}
      </a>
    </li>
  )
)}

        <a className='underline' href={trans} target='_blank' rel='noreferrer'>Trolley/Bus Transport</a>
      </ul>
    </Layout>
  )
}


function FAQ() {
  const faqs = [
    { q: 'Is there parking at the venue?', a: 'Limited; rideshare (Uber/Lyft) recommended.' },
    { q: 'Are kids welcome?', a: 'We love them, but this is an adults-only celebration.' },
    { 
      q: 'What are the ceremony details?', 
      a: 'We will update the site when we have a specific location on the beach. We are at the mercy of our wedding planners.' 
    },
    { 
      q: 'What should I expect at cocktail hour?', 
      a: 'There will be mostly champagne offered while we are taking photos. You are welcome to BYOB.' 
    },
    { 
      q: 'What about the celebration?', 
      a: 'We will have food, draft beer and basic cocktail options! You are welcome to bring anything additional to drink. There is also a heated pool and hot tub—feel free to suit up! Celebration is from 7-10 pm. It will end promptly at 10 pm.' 
    },
    { 
      q: 'What is there to do in our free time?', 
      a: (<span>Please see our <a href="/things-to-do" className="underline">Things To Do</a> section.</span>) 
    },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-serif mb-6">FAQs</h1>
      <div className="space-y-3">
        {faqs.map(f => (
          <details key={f.q} className="border rounded-xl p-4 bg-white/70">
            <summary className="font-medium cursor-pointer">{f.q}</summary>
            <p className="mt-2 text-sm opacity-80">{f.a}</p>
          </details>
        ))}
      </div>
    </Layout>
  );
}
function HomeMenuSection() {
  return (
    <section aria-labelledby="home-quick-links" className="mt-10">
      <h2 id="home-quick-links" className="text-xl font-semibold mb-4">
        Plan your trip
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITE.navLinks.map(link => (
          <NavCard
            key={link.to}
            to={link.to}
            title={link.label}
            blurb={link.blurb}
          />
        ))}
      </div>
    </section>
  );
}
function Card({ title, children }){
  return (
    <div className='border rounded-2xl p-5 bg-white/70'>
      <h2 className='text-xl font-serif mb-3'>{title}</h2>
      {children}
    </div>
  )
}
function ScheduleCard() {
  return (
    <Card title="Schedule">
      <ul className="text-sm space-y-2">
        {SITE.schedule.map((ev) => (
          <li key={ev.title}>
            <span className="font-medium">{ev.title}</span> —{" "}
            {new Date(ev.start).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              timeZone: "America/New_York",
            })}
          </li>
        ))}
      </ul>
      <NavLink
        to="/schedule"
        className="inline-block mt-4 px-5 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow hover:bg-gray-900 transition"
      >
        View Full Schedule
      </NavLink>
    </Card>
  );
}

function TravelCard() {
  return (
    <Card title="Travel">
      <p className="text-sm">
        Fly into the closest or cost-effective airport. Rideshare (Uber/Lyft) is easiest.
        Attire: beach party casual.
      </p>
      <NavLink
        to="/travel"
        className="inline-block mt-4 px-5 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow hover:bg-gray-900 transition"
      >Travel Details
      </NavLink>
    </Card>
  );
}

function StayCard() {
  return (
    <Card title="Stay">
      <p className="text-sm">
        We’ve provided links of nearby options for convenience. Book early to secure the
        best rate and enjoy being close to the venue. 🏨
      </p>
      <NavLink
        to="/stay"
        className="inline-block mt-4 px-5 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow hover:bg-gray-900 transition"
      >
        View Stay Options
      </NavLink>
    </Card>
  );
}

function ThingsToDoCard() {
  return (
    <Card title="Things to Do">
      <p className="text-sm">
        Make the most of your trip! Explore local beaches, restaurants, and fun nearby attractions. 🌴 🍹 🎟️ 
      </p>
      <NavLink
        to="/things-to-do"
        className="inline-block mt-4 px-5 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow hover:bg-gray-900 transition"
      >
        Explore More
      </NavLink>
    </Card>
  );
}

function FAQCard() {
  return (
    <Card title="FAQ">
      <p className="text-sm">
        Facts Matter 😄
      </p>
      <NavLink
        to="/faq"
        className="inline-block mt-4 px-5 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow hover:bg-gray-900 transition"
      >
        View Facts
      </NavLink>
    </Card>
  );
}


export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/schedule' element={<Schedule />} />
      <Route path='/travel' element={<Travel />} />
      <Route path='/stay' element={<Layout><Stay /></Layout>}/>
      <Route path="/things-to-do" element={<Layout><ThingsToDo /></Layout>} />
      <Route path='/rsvp' element={<RSVP />} />
      <Route path='/rsvp-success' element={<Layout><RSVPSuccess /></Layout>} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='*' element={<Layout><p>Page not found.</p></Layout>} />
    </Routes>
  )
}
// function Layout({ children }) {
//   return (
//     <div className='min-h-screen bg-[#f7f4ef] text-zinc-900'>
//       <Nav />
//       <main className='max-w-4xl mx-auto px-4 py-8'>{children}</main>
//       <footer className='px-4 py-10 text-center text-sm opacity-70'>
//         © {new Date().getFullYear()} {SITE.couple}
//       </footer>
//     </div>
//   );
// }
