// components/NavCard.jsx
import { NavLink } from 'react-router-dom';

export default function NavCard({ to, title, blurb, icon }) {
  return (
    <NavLink
      to={to}
      className="group block rounded-2xl border border-zinc-200 p-5 shadow-sm transition
                 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
    >
      <div className="flex items-start gap-3">
        {icon ? <div className="text-2xl">{icon}</div> : null}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {blurb ? <p className="mt-1 text-sm text-zinc-600">{blurb}</p> : null}
          <span className="mt-3 inline-block text-sm font-medium underline">
            Open
          </span>
        </div>
      </div>
    </NavLink>
  );
}
