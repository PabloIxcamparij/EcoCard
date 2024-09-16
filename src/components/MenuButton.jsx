import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuButton({ route, title }) {
  return (
    <NavLink to={`/${route}`} className="w-3/5">
      <button className="w-full text-2xl font-bold bg-custom-green-light p-2 rounded-2xl text-white transform transition duration-200 hover:bg-custom-green-dark hover:scale-110 hover:-translate-y-4">
        {title}
      </button>
    </NavLink>
  );
}
