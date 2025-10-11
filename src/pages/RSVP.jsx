import {
  useRef,
  useState,
} from 'react';

import emailjs from '@emailjs/browser';

export default function RSVP() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const attending = formData.get("attending"); // "yes" | "no"

    try {
      setStatus("sending");
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY" }
      );

      setStatus("sent");
      formRef.current?.reset();

      setTimeout(() => {
        if (attending === "no") {
          window.location.href = "/rsvp-thank-you";
        } else {
          window.location.href = "/rsvp-success";
        }
      }, 600);
    } catch (err) {
      console.error(err);
      setStatus("error");
      alert("Sorry—there was a problem sending your RSVP. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-serif mb-6">RSVP</h1>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        name="rsvp"
        method="POST"
        data-netlify="true"
        className="space-y-3 max-w-md"
      >
        <input type="hidden" name="form-name" value="rsvp" />

        <label className="block">
          <span className="block mb-1">Name</span>
          <input
            className="w-full border p-2 rounded"
            name="name"
            placeholder="Your full name"
            required
          />
        </label>

        <label className="block">
          <span className="block mb-1">Email (optional)</span>
          <input className="w-full border p-2 rounded" type="email" name="email" />
        </label>

        <label className="block">
          <span className="block mb-1">Number of guests (including you)</span>
          <select name="guests" defaultValue="1" className="w-full border p-2 rounded" required>
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <p className="text-xs opacity-70 mt-1">Select 0 if not attending.</p>
        </label>

        <label className="block">
          <span className="block mb-1">Attending?</span>
          <select className="w-full border p-2 rounded" name="attending" required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-white transition-all shadow-md 
            ${
              status === "sent"
                ? "bg-green-600 hover:bg-green-700"
                : status === "sending"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2d3e50] hover:bg-[#1f2d3d]"
            }`}
        >
          {status === "sending" ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Sending...
            </span>
          ) : status === "sent" ? (
            <span className="inline-flex items-center gap-2">
              <span role="img" aria-label="check">✅</span> RSVP Sent!
            </span>
          ) : (
            "Send RSVP"
          )}
        </button>
      </form>
    </>
  );
}
