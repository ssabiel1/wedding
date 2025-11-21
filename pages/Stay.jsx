// src/pages/Stay.jsx
const g = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function Stay() {
  const BASE_ADDR = "310 81st St W, Bradenton, FL 34209, USA";

  const hotels = [
    { name: "Hotel A", link: "#", code: "WEDPARTY", deadline: "Apr 20, 2026" },
    { name: "Hotel B", link: "#" },
  ];

  return (
    <div className="space-y-10">
      {/* Intro */}
      <section className="space-y-2">
        <h1 className="text-2xl font-serif">Where to Stay</h1>
        <p className="opacity-80">
          There are plenty of options nearby—from hotels to vacation rentals.
        </p>
      </section>

      {/* Our Base */}
      <section className="border rounded-xl p-4">
        <div className="mt-5 mb-6 mx-auto max-w-md text-center bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 shadow-sm">
          <p className="text-lg font-serif text-amber-900 mb-1 flex items-center justify-center gap-1">
            <span role="img" aria-label="house">🏡</span> <span>Our Base</span>
          </p>
          <p className="text-gray-800 font-medium">
            310 81st St W, Bradenton, FL 34209, USA
          </p>
          <a
            href="https://www.google.com/maps?q=310+81st+St+W,+Bradenton,+FL+34209"
            target="_blank"
            rel="noreferrer"
            className="block mt-2 underline text-amber-800 hover:text-amber-900"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* Hotel Blocks
      <section>
        <h2 className="text-xl font-serif mb-3">Hotel Blocks</h2>
        <div className="space-y-4">
          {hotels.map((h) => (
            <div key={h.name} className="border p-4 rounded-xl">
              <div className="font-medium">{h.name}</div>
              {h.code && (
                <div className="text-sm">
                  Block code: <code>{h.code}</code>
                </div>
              )}
              {h.deadline && (
                <div className="text-sm">Book by {h.deadline}</div>
              )}
              <a
                className="underline"
                href={h.link}
                target="_blank"
                rel="noreferrer"
              >
                Book
              </a>
            </div>
          ))}
        </div>
      </section> */}

      {/* Vacation Rentals */}
      <section>
        <h2 className="text-xl font-serif mb-3">Vacation Rentals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://www.airbnb.com/s/Anna-Maria-Island--FL--United-States/homes"
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl p-4 underline hover:shadow transition"
          >
            Search Airbnb
          </a>
          <a
            href="https://www.vrbo.com/search/keywords:anna-maria-island-florida-united-states"
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl p-4 underline hover:shadow transition"
          >
            Search VRBO
          </a>
        </div>
      </section>

      {/* Hotels by Area */}
      <section>
        <h2 className="text-xl font-serif mb-3">Hotels by Area</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={g("hotels near Bradenton Beach FL")}
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl p-4 underline hover:shadow transition"
          >
            Hotels near Bradenton Beach
          </a>
          <a
            href={g("hotels near Anna Maria Island FL")}
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl p-4 underline hover:shadow transition"
          >
            Hotels near Anna Maria Island
          </a>
          <a
            href={g("hotels near Coquina Beach FL")}
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl p-4 underline hover:shadow transition"
          >
            Hotels near Coquina Beach
          </a>
          <a
            href={g("hotels near Holmes Beach FL")}
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl p-4 underline hover:shadow transition"
          >
            Hotels near Holmes Beach
          </a>
        </div>
      </section>
    </div>
  );
}
