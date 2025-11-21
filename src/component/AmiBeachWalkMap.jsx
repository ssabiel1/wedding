import 'leaflet/dist/leaflet.css';

import { useMemo } from 'react';

import L from 'leaflet';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';

// Simple round marker (avoids missing default Leaflet icon assets in bundlers)
const dot = (color = "#2563eb") =>
  L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 6px rgba(0,0,0,.3)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

// Coordinates
// 28th St Beach Access (28th St & Avenue E): 27°29'10.29" N, 82°42'24.73" W -> 27.486192, -82.706869
const DEST = { lat: 27.486192, lng: -82.706869 };

// Manatee Public Beach (approx at main lot / Beach Café area). If you prefer exact coords, update here.
// Using a well-known point on the Manatee Public Beach complex.
const ORIGIN = { lat: 27.496000, lng: -82.710900 };

// Helper to build a Google Maps walking link using place text (more robust than lat/lng for origin)
const gmWalkingUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Manatee+Public+Beach+4000+Gulf+Dr,+Holmes+Beach,+FL&destination=27.486192,-82.706869&travelmode=walking";

export default function AmiBeachWalkMap() {
  // Fit map bounds nicely around origin + destination
  const bounds = useMemo(() => L.latLngBounds([ORIGIN, DEST]).pad(0.2), []);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-white">
      <div className="p-4 md:p-6 space-y-3">
        <h2 className="text-2xl font-semibold">Manatee Public Beach → 28th St Access</h2>
        <p className="text-gray-600 leading-relaxed">
          
        </p>
        <div className="flex gap-3 flex-wrap">
          {/* <a
            href={gmWalkingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition shadow"
          >
            Open in Google Maps (walking)
          </a> */}
          {/* <a
            href="https://www.holmesbeachfl.org/news_detail_T9_R98.php"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
          >
            Holmes Beach parking map
          </a> */}
        </div>
      </div>

      {/* Map */}
      <div className="h-[420px] w-full">
        <MapContainer bounds={bounds} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={ORIGIN} icon={dot("#16a34a")}>
            <Popup>
              <div className="space-y-1">
                <div className="font-medium">Start: Manatee Public Beach</div>
                <div>4000 Gulf Dr, Holmes Beach, FL</div>
                <a href={gmWalkingUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  Google walking route →
                </a>
              </div>
            </Popup>
          </Marker>

          <Marker position={DEST} icon={dot("#dc2626")}>
            <Popup>
              <div className="space-y-1">
                <div className="font-medium">Finish: 28th St Beach Access</div>
                <div>28th St & Avenue E, Holmes Beach</div>
                <div className="text-xs text-gray-500">(Public beach access)</div>
              </div>
            </Popup>
          </Marker>

          <Polyline positions={[ORIGIN, DEST]} dashArray="6 8" />
        </MapContainer>
      </div>

      <div className="p-4 md:p-6 text-sm text-gray-600">
        <ul className="list-disc pl-5 space-y-1">
          <li>Tip: Bring sandals for the warm sand; the packed wet sand is easiest for walking.</li>
          <li>Restrooms & café available at Manatee Public Beach.</li>
          <li>No glass on the beach; please pack out what you pack in.</li>
        </ul>
      </div>
    </div>
  );
}
