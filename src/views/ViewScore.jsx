import React from "react";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";

export default function ViewScore() {
  return (
    <div className="flex flex-col bg-custom-white h-screen gap-3 p-5">
      
      <NavLink to="/" className="w-3/5">
        <Button className="bg-custom-green-light">
          <HomeIcon className="h-10 w-10 text-white" />
        </Button>
      </NavLink>
      
    </div>
  );
}
