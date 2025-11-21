// src/pages/ThingsToDo.jsx
const g = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function ThingsToDo() {
  const mapLinks = [
    { label: "Bridge Street (Bradenton Beach)", q: "Bridge Street, Bradenton Beach" },
    { label: "Coquina Beach", q: "Coquina Beach" },
    { label: "Manatee Public Beach", q: "Manatee Public Beach" },
    { label: "Bean Point", q: "Bean Point" },    
  ];

  const activities = [
    "Stroll Bridge Street (shops, mini golf, live music).",
    "Coquina Beach Market (seasonal crafts & food).",
    "Kayak/paddleboard the mangroves or Bimini Bay.",
    "Sunset dolphin cruise (Bradenton Beach marinas).",
    "Jet ski or parasail for a little adventure.",
    "Even horseback riding.",
    "And many more other options to explore!",
  ];

  const eatsAndBars = [
    { label: "Daiquiri Deck (Bradenton Beach)", q: "Daiquiri Deck Bradenton Beach" },
    { label: "Bridge Tender Inn", q: "Bridge Tender Inn Bradenton Beach" },
    { label: "Island Time Bar & Grill", q: "Island Time Bar & Grill Bradenton Beach" },
    { label: "Beach House Waterfront Restaurant", q: "Beach House Bradenton Beach" },
    { label: "The Sandbar Restaurant", q: "Sandbar Restaurant Anna Maria" },
    { label: "Rod & Reel Pier", q: "Rod & Reel Pier Anna Maria" },
    { label: "Tiki Bars near Coquina Beach", q: "tiki bar near Coquina Beach" },
    { label: "Tiki Bars on Anna Maria Island", q: "tiki bar Anna Maria Island" },
    { label: "Drift Inn", q: "Drift Inn Bradenton" },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-serif">Things To Do</h1>
        <p className="opacity-80">
          Beaches, Bridge Street, markets, water adventures, and plenty of food & drinks.
          Everything is easy with the free Anna Maria Trolley.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-serif mb-3">Highlights</h2>
        <ul className="list-disc pl-6 space-y-2">
          {activities.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-serif mb-3">Restaurants & Nightlife</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {eatsAndBars.map(x => (
            <a
              key={x.label}
              className="border rounded-xl p-3 hover:shadow transition underline"
              href={g(x.q)}
              target="_blank"
              rel="noreferrer"
            >
              {x.label}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-serif mb-3">Quick Map Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mapLinks.map(m => (
            <a
              key={m.label}
              className="border rounded-xl p-3 text-center hover:shadow transition underline"
              href={g(m.q)}
              target="_blank"
              rel="noreferrer"
            >
              {m.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
