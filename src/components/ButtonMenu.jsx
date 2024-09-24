import React from "react";
import { Howl } from "howler";
import { NavLink } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function ButtonMenu({ route, title, Icon }) {
  // Sound for activating button
  const activationSound = new Howl({
    src: ["/songs/Effect-Card-Start.mp3"],
    volume: 0.5,
  });

  return (
    <NavLink to={route} className="w-2/3">
      <Button
        className="flex text-start w-full text-2xl font-bold bg-custom-green p-6 rounded-2xl text-white transform transition duration-250 hover:bg-custom-green-dark hover:scale-110 hover:-translate-y-4"
        onMouseEnter={() =>
          activationSound.play()
        }
      >
        {Icon && <Icon className="h-6 w-6 mr-3" />}
        {title}
      </Button>
    </NavLink>
  );
}
