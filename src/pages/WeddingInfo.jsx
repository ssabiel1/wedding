import React from 'react';

import { Layout } from '../App';
import AmiBeachWalkMap from '../component/AmiBeachWalkMap';

export default function WeddingInfo() {
  return (
    <Layout>
      <div className="min-h-screen bg-white text-gray-800 font-sans">
        <header className="bg-teal-600 text-white py-10 text-center rounded-2xl mb-6">
          <h1 className="text-4xl font-bold">Wedding Guest Guide</h1>
          <p className="text-xl mt-2">Parking | Trolley | Ceremony Access</p>
        </header>

        <section className="space-y-10">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Getting to the Ceremony</h2>
            <p className="leading-relaxed mb-3">
              Our ceremony will take place at the <strong>28th Street Beach Access in Holmes Beach, FL</strong>.
              Parking at this entrance is very limited, so we recommend that guests park at
              <strong> Manatee Public Beach</strong> and use the free Anna Maria Island Trolley.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6">For Local Guests</h3>
            <p className="leading-relaxed mb-3">
            If you're local or staying nearby on the island, we strongly recommend using <strong>rideshare </strong>
            options such as <strong>Uber</strong> or <strong>Lyft</strong>, or carpooling with friends and family.
            This helps reduce parking congestion near the ceremony site and makes arrival much easier.
            </p>
            <p className="leading-relaxed mb-3">
            Drivers can drop off at the corner of <strong>Gulf Dr & 28th Street</strong>, which is just a short walk
            to the beach entrance.
            </p>


            <h3 className="text-lg font-semibold text-gray-800 mt-4">Where to Get On the Trolley</h3>
            <p className="leading-relaxed mb-3">
              <strong>Board at Manatee Public Beach – Trolley Stop #3</strong>. This stop is located directly in
              front of the main pavilion and restrooms. Look for the green "Island Trolley" sign.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4">Where to Get Off</h3>
            <p className="leading-relaxed mb-3">
              <strong>Exit at Gulf Dr & 28th Street</strong>. This trolley stop is just a quick 2–3 minute walk west
              down 28th Street to reach the beach entrance.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4">Trolley Schedule</h3>
            <ul className="list-disc pl-6 space-y-1 mb-3 text-sm">
              <li>Runs daily from <strong>6:00 AM – 10:30 PM </strong></li>
              <li>Every <strong>20 minutes</strong> during the day</li>
              <li>Every <strong>30 minutes</strong> in the evening</li>
              <li><strong>Free</strong> — no ticket or pass needed</li>
            </ul>

            <p className="leading-relaxed mb-3">
              For a <strong>4:00 PM ceremony</strong>, please board the trolley between <strong>3:15–3:25 PM </strong>
              to allow plenty of time to ride and walk to the ceremony spot.
            </p>


            <h3 className="text-lg font-semibold text-gray-800 mt-4">Trolley Live Tracker</h3>          

            <h3 className="text-lg font-semibold text-gray-800 mt-4">Using the myStop Mobile App</h3>
            <ul className="list-disc pl-6 space-y-1 mb-3 text-sm leading-relaxed">
              <li><strong>Download the app:</strong> Search for "myStop Mobile" in your phone’s app store (iOS or Android).</li>
              <li><strong>Select your location:</strong> Choose <strong>Manatee County</strong> from the list of transit systems to access AMI Trolley information.</li>
              <li><strong>Track the trolley:</strong> View the trolley’s real-time location on a map and see estimated arrival times for your stop.</li>
              <li><strong>View route details:</strong> Explore stop-by-stop details along the Anna Maria Island Trolley route.</li>
            </ul>

             <h3 className="text-lg font-semibold text-gray-800 mt-6">Additional Parking Option</h3>
            <p className="leading-relaxed mb-3">
            Guests may also park at <strong>Herb Dolan Park</strong>, located at <strong>26th Street North & Avenue A in Bradenton Beach</strong>.
            This small waterfront park has public parking and is approximately a <strong>7–8 minute walk</strong> to the 28th Street
            beach entrance. Walk north along Gulf Drive, then turn west onto 28th Street.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6">Neighborhood Street Parking</h3>
            <p className="leading-relaxed mb-3">
           
            Limited neighborhood parking may also be available on side streets near the ceremony location.
            Please <strong>pay close attention to posted signs</strong> — some areas are marked as <strong>No Parking</strong>,
            <strong>Resident Only</strong>, or have time restrictions. Vehicles parked illegally risk towing or tickets.
            When in doubt, look for clearly marked <strong>Public Parking</strong> signs and ensure your vehicle is fully off the roadway.
            </p>
                       <a
            href="https://www.holmesbeachfl.org/news_detail_T9_R98.php"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
          >
            Holmes Beach parking map
          </a>
          </div>

        <section className="max-w-5xl mx-auto p-4">
        <AmiBeachWalkMap />
      </section>
        </section>
      </div>
    </Layout>
  );
}
