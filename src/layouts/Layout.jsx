import React from "react";
import { Howl } from "howler";
import { Outlet } from "react-router";

export default function Layout() {
  const backgroundMusic = new Howl({
    src: ["/public/OST.mp3"],
    loop: true, // To keep it playing continuously
    volume: 0.2, // Adjust volume as needed
  });

  backgroundMusic.play();

  return (
    <div
      className=" bg-custom-white p-5 gap-8"
    >
      <Outlet />
    </div>
  );
}
