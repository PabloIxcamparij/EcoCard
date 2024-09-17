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
    <div className=" w-full bg-custom-white p-5">
      <NavLink to="/" className="w-3/5">
      <Button className="bg-transparent">
          <HomeIcon className="h-10 w-10 text-custom-green-dark" />
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
            <li>No hay puntajes guardados</li>
          )}
        </ul>
      </div>

      <div className="mt-5 mb-5">
        <h2 className="text-xl font-bold text-center">Perdidas</h2>
        <ul className="list-disc ml-5">
          {savedMatchLotScores && savedMatchLotScores.length > 0 ? (
            savedMatchLotScores.map((score, index) => (
              <li key={index} className="text-lg">
                Score {index + 1}: {score}
              </li>
            ))
          ) : (
            <li>No hay puntajes guardados</li>
          )}
        </ul>
      </div>

    </div>
  );
}
