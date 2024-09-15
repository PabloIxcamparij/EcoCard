import React from "react";
import { Rules } from "../json/Rules";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";

export default function ViewRules() {
  return (
    <>
      <NavLink to="/" className="w-3/5">
        <Button className="bg-transparent">
          <HomeIcon className="h-10 w-10 text-custom-green-dark" />
        </Button>
      </NavLink>

      <div className="p-2">
       
        <h1 className="text-2xl font-bold text-center text-custom-green-dark">
          ¿Comó jugar?
        </h1>

        <br />

        <article>
          <p>
            <strong>Eco Card</strong> es un juego donde tienes que hacer manos
            de cartas para alcanzar un <strong>puntaje</strong> y así pasar de
            nivel.
            <strong> Hay 15 niveles en total.</strong>
          </p>

          <br />
          <p>
            <strong>Al perder</strong>, se vuelve al <strong>inicio</strong>. Y
            pierdes cuando ya no tienes más <strong>jugadas disponibles</strong>
            . Puedes <strong>seleccionar cartas</strong> para{" "}
            <strong>descartarlas</strong>, recibiendo nuevas. Y se gana
            dependiendo de las cartas que elijas. Ya que estas irán reduciendo
            el <strong>objetivo</strong>, y cuando lo superes, ¡pasarás al{" "}
            <strong>siguiente nivel</strong>!
          </p>
          <br />

          <p>
            Además <strong>cada 3 niveles</strong>, recibirás un{" "}
            <strong>comodín</strong> de manera aleatoria para ayudarte en el
            juego.
          </p>

          <br />

          <p className="text-center">
            En la <strong>cabecera del juego</strong>, hay tres cosas
            importantes:
          </p>
          <br />
          <ul>
            <li>
              <strong>Valor:</strong> El puntaje de la mano que tienes.
            </li>
            <li>
              <strong>Tipo:</strong> El tipo de mano que estás jugando.
            </li>
            <li>
              <strong>Objetivo:</strong> Los puntos que necesitas para pasar al
              siguiente nivel.
            </li>
          </ul>
          <br />
        </article>
      </div>

      <div>

        <h1 className="text-2xl font-bold text-center text-custom-green-dark">
          Juegos de manos reconocibles
        </h1>

        <br />

        {Rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-4">
            <h1>
              <span className="font-bold">{rule.title}: </span>
              {rule.body}{" "}
            </h1>
          </div>
        ))}
      </div>

    </>
  );
}
