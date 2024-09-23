import React from "react";
import { Rules } from "../json/Rules";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";

export default function ViewRules() {
  return (
    <div className="min-h-screen p-5">
      <NavLink to="/" className="w-3/5 -m-4">
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
            . Además, puedes <strong>seleccionar cartas</strong> para{" "}
            <strong>descartarlas</strong> y recibiendo nuevas. Se gana
            dependiendo de las cartas que elijas, ya que estas irán reduciendo
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

          <p>
            !Pero, ten cuidado, ya que en ciertos niveles{" "}
            <strong>un tipo de carta</strong>, no seran
            <strong> valoradas </strong>, por lo que jugarlas no ayudaran a
            superar el objtivo.
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

          <p className="text-center">
            Existe 4 tipo de cartas <strong> tipo de cartas</strong>:
          </p>
          <br />
          <ul>
            <li>
              <strong className="text-[#e46c0a]">Vidrio:</strong> Son las cartas
              de color 
              <span className="text-[#e46c0a] font-bold"> naranjas</span>
              . !ten, cuidado! que son muy cortates
            </li>
            <li>
              <strong className="text-gray-400">Papel y cartón:</strong> Son las
              cartas <span className="text-gray-400 font-bold">grises</span>
              . siembre hay, hasta que se ocupa
            </li>
            <li>
              <strong className="text-amber-400 ">Aluminio:</strong> Hay las
              cartas <span className="text-amber-400 font-bold">amarillas</span>
              . Las latas son de 1813 y el aberlatas de 1858. Fueron unos años dificiles
            </li>
            <li>
              <strong className="text-[#0085cb]">Envases:</strong> Son las
              cartas <span className="text-[#0085cb] font-bold">azules</span>
              . La mayor decepción, ver helado y en realidad eran frijoles.            </li>
          </ul>

          <br />
        </article>
      </div>

      <div className="mb-5">
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
    </div>
  );
}
