import React, { useEffect } from "react";
import { Howl } from "howler";
import { Outlet } from "react-router";

export default function Layout() {
  const backgroundMusic = new Howl({
    src: ["/songs/Ost.mp3"],
    loop: true,
    volume: 0.2,
  });
  
  backgroundMusic.play()

  return (
    <div className=" bg-custom-white p-5 gap-8">
      <Outlet />
    </div>
  );
}
