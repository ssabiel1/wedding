export const SITE = {
  couple: "Jamie Teet & Sarah Sabiel",
  dateISO: "2025-12-06T15:30:00-04:00",
  city: "Holmes Beach 28th St, Anna Maria Island",
  directions: "Limited Parking.",
  venue: { name: "Holmes Beach - 28th St Beach Access", address: "28th St", directions: 'https://maps.app.goo.gl/BgDNPmAW46P18G2h8https://www.google.com/maps/place/Gulf+Dr+N%2F28th+St+N/@27.486311,-82.708476,17z/data=!3m1!4b1!4m6!3m5!1s0x88c311ba69add7c5:0x4b805d182c50f881!8m2!3d27.4863063!4d-82.7059011!16s%2Fg%2F11dxkft0ds?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D'},
  hotelBlocks: [
    { name: "Airbnb", link: "https://www.airbnb.com/"},
    { name: "VRBO", link: "https://www.vrbo.com/"},
    { name: "Maps/Points of Interest", link: "https://sarasota.welcomeguide-map.com/default.aspx?redirect=/interactiveMap/interactiveMap.aspx%3Fnp%3D5%26nc%3D20%26do%3D2%26dr%3D13"}
  ],
  registryLinks: [
    { label: "Zola", url: "#" }
  ],
  schedule: [
    { title: "Ceremony", start: "2025-12-06T17:00:00-04:00", end: "2025-12-06T18:00:00-04:00", location: "Holmes Beach – 28th St"},
    { title: "Cocktail Hour", start: "2025-12-06T18:00:00-04:00", end: "2025-12-06T19:00:00-04:00", location: "Holmes Beach – 28th St"},
    { title: "Celebration", start: "2025-12-06T19:30:00-04:00", end: "2025-12-06T23:00:00-04:00" , location: "310 81st St. W Bradenton, FL 34209"}
  ],
  travelTips: [
    "Fly into SRQ - Sarasota/Bradenton Airport (26-40 min drive; depending on you location; traffic permitting).",
    "Fly into TPA - Tampa Airport (1hr 15 min drive; traffic permitting).",
    "Attire is beach casual.",
    {text: "There are many places for lodging that are walking distance to the beach and shops. Please see some of your options in our menu section ", 
      link: { label: "Stay.", to: "/stay" }
    },
    "Rideshare (Uber/Lyft) is easiest; car rentals; some areas have limited parking.",
    "There is also a free Island Trolley. Another option is the Monkey Bus which goes to mainland for only $5; you can schedule a ride.",   
  ],
  schedule: [
    {
      title: "Ceremony",
      start: "2025-12-06T16:00:00-05:00",
      end: "2025-12-06T17:00:00-05:00",
      location: "Holmes Beach-28th St Beach Access Entrance",
      notes:
        "Limited parking. "
    },
    {
      title: "Cocktail Hour",
      start: "2025-12-06T17:00:00-05:00",
      end: "2025-12-06T18:00:00-05:00",
      location: "Holmes Beach-28th St Beach Access Entrance",
      notes:
        "Some champagne offered while we are taking photos. You are welcome to BYOB."
    },
    {
      title: "Celebration",
      start: "2025-12-06T18:30:00-05:00",
      end: "2025-12-06T22:00:00-05:00",
      location: "310 81st St W, Bradenton, FL 34209",
      notes:
        "We will have food, draft beer, and basic cocktail options! BYOB is welcomed and suggested in case of limited options. We do have a large driveway, but we’re expecting quite a few guests—so ridesharing and carpooling are highly recommended."
    }
  ],
    navLinks: [   
    { label: 'Stay', to: '/stay', blurb: 'Hotels, rentals, and tips' },    
    { label: 'Things to Do', to: '/things-to-do', blurb: 'Beaches, food, fun' },  
    { label: 'FAQ', to: '/faq', blurb: 'Common questions, answered' },
  ],
};
