import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useGameStore } from "../stores/useGameStore";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

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
    <div className="min-h-screen bg-custom-white p-5">
      <NavLink to="/" className="w-3/5 -ml-4">
        <Button className="bg-transparent">
          <HomeIcon className="h-10 w-10 text-custom-green-dark" />
        </Button>
      </NavLink>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-5">
          Puntajes registrados
        </h1>

        <div className="flex justify-center items-center w-4/5 h-12 bg-custom-green rounded-3xl mt-5 mb-5">
          <h1 className="text-xl font-bold text-white">Ganadas</h1>
        </div>

        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn className="text-center font-bold text-custom-green ">
              Puntaje
            </TableColumn>
          </TableHeader>
          <TableBody>
            {savedMatchWinsScores.map((score, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-center font-bold text-custom-green">
                  {score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center items-center w-4/5 h-12 bg-custom-red rounded-3xl mt-5 mb-5">
          <h1 className="text-xl font-bold text-white">Perdidas</h1>
        </div>

        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn className="text-center font-bold text-custom-red">
              Puntaje
            </TableColumn>
          </TableHeader>

          <TableBody>
            {savedMatchLotScores.map((score, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-center font-bold text-custom-red ">
                  {score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
