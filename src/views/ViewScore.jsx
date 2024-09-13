import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useGameStore } from "../stores/useGameStore";

export default function ViewScore() {
  const { loadScore, savedMatchWinsScores, savedMatchLotScores } = useGameStore(
    (state) => ({
      loadScore: state.loadScore,
      savedMatchWinsScores: state.savedMatchWinsScores,
      savedMatchLotScores: state.savedMatchLotScores,
    })
  );

  // Cargar los puntajes al cargar el componente
  useEffect(() => {
    loadScore();
  }, []);

  return (
    <div className="flex flex-col bg-custom-white h-screen gap-3 p-5">
      <NavLink to="/" className="w-3/5">
        <Button className="bg-custom-green-light">
          <HomeIcon className="h-10 w-10 text-white" />
        </Button>
      </NavLink>
      <h1 className="text-2xl font-bold text-center"> Puntajes registrados </h1>

      <div className="mt-5">
        <h2 className="text-xl font-bold text-center">Ganadas</h2>
        <ul className="list-disc ml-5">
          {savedMatchWinsScores && savedMatchWinsScores.length > 0 ? (
            savedMatchWinsScores.map((score, index) => (
              <li key={index} className="text-lg">
                Score {index + 1}: {score}
              </li>
            ))
          ) : (
            <li>No puntajes guardados</li>
          )}
        </ul>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold text-center">Perdidas</h2>
        <ul className="list-disc ml-5">
          {savedMatchLotScores && savedMatchLotScores.length > 0 ? (
            savedMatchLotScores.map((score, index) => (
              <li key={index} className="text-lg">
                Score {index + 1}: {score}
              </li>
            ))
          ) : (
            <li>No puntajes guardados</li>
          )}
        </ul>
      </div>
    </div>
  );
}
