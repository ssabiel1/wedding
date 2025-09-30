import {
  useRef,
  useState,
} from 'react';

import {
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';

import emailjs from '@emailjs/browser';

import { SITE } from './content/siteConfig';
import heroImg from './img/IMG_3892.jpg';
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

function Layout({ children }){
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
      </section>
    </Layout>
  );
}

function Schedule() {
  return (
    <Layout>
      <h1 className="text-2xl font-serif mb-6">Schedule</h1>

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
            <li
              key={ev.title}
              className="border rounded-xl p-4 space-y-2"
            >
              {/* Top row: title/location, time, add-to-calendar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-sm opacity-70">
                    {ev.location || SITE.venue?.name}
                  </div>
                </div>

                <div className="text-sm">
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

                <a
                  href={url}
                  download={`${ev.title}.ics`}
                  className="text-sm underline w-full sm:w-auto text-center"
                >
                  Add to Calendar
                </a>
              </div>

              {/* Inline note that matches your beige theme */}
              {ev.notes && (
                <p className="text-sm italic opacity-80 border-l-2 border-gray-300 pl-3 mt-1">
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
      <p className='mb-3'><span className='font-medium'>Venue:</span> {SITE.venue.name}</p>
      <a className='underline' href={gmaps} target='_blank' rel='noreferrer'>Open in Google Maps</a>
      <ul className='list-disc pl-6 mt-4 space-y-1'>
        {SITE.travelTips.map((t,i)=>(<li key={i}>{t}</li>))}
        <a className='underline' href={trans} target='_blank' rel='noreferrer'>Trolley/Bus Transport</a>
      </ul>
    </Layout>
  )
}
// function Stay(){
//   return (
//     <Layout>
//       <h1 className='text-2xl font-serif mb-6'>Stay</h1>
//       <div className='space-y-4'>
//         {SITE.hotelBlocks.map(h => (
//           <div key={h.name} className='border p-4 rounded-xl'>
//             <div className='font-medium'>{h.name}</div>
//             {h.code && <div className='text-sm'>Block code: <code>{h.code}</code></div>}
//             {h.deadline && <div className='text-sm'>Book by {new Date(h.deadline).toLocaleDateString()}</div>}
//             <a className='underline' href={h.link} target='_blank' rel='noreferrer'>Link</a>
//           </div>                    
//         ))}
//       </div>
//     </Layout>
//   )
// }

function RSVP(){
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('sending');
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY' }
      );
      setStatus('sent');
      formRef.current?.reset();
      window.location.href = "/rsvp-success";
      window.location.href = "/rsvp-success";
    } catch (err) {
      console.error(err);
      setStatus('error');
      alert('Sorry—there was a problem sending your RSVP. Please try again.');
    }
  };

  return (
    <Layout>
      <h1 className='text-2xl font-serif mb-6'>RSVP</h1>
      <form ref={formRef} onSubmit={onSubmit} name='rsvp' method='POST' data-netlify='true' className='space-y-3 max-w-md'>
        <input type='hidden' name='form-name' value='rsvp' />
        <label className='block'>
          <span className='block mb-1'>Name</span>
          <input className='w-full border p-2 rounded' name='name' placeholder='Your full name' />
        </label>
        <label className='block'>
          <span className='block mb-1'>Email (optional)</span>
          <input className='w-full border p-2 rounded' type='email' name='email' />
        </label>
        <label className="block">
          <span className="block mb-1">Number of guests (including you)</span>
          <select
            name="guests"
            defaultValue="1"
            className="w-full border p-2 rounded"
            required
          >
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <p className="text-xs opacity-70 mt-1">Select 0 if not attending.</p>
        </label>
        <label className='block'>
          <span className='block mb-1'>Attending?</span>
          <select className='w-full border p-2 rounded' name='attending'>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
        </label>
        <button className='w-full sm:w-auto px-5 py-3 border rounded-xl'>Send RSVP</button>
      </form>
    </Layout>
  )
}

function FAQ() {
  const faqs = [
    { q: 'Is there parking at the venue?', a: 'Limited; rideshare recommended.' },
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
      a: 'We will have food, draft beer, basic cocktail options and more! You are welcome to bring any additional drinks you would like for yourself in case we are missing your favorite beverage. There is also a heated pool and hot tub—feel free to suit up!' 
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
        Fly into the closest or cost-effective airport. Rideshare is easiest.
        Attire: beach party casual.
      </p>
      <NavLink
        to="/travel"
        className="inline-block mt-4 px-5 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow hover:bg-gray-900 transition"
      >
        Travel Details
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
