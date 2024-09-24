import ButtonMenu from "../components/ButtonMenu";
import { ChartBarIcon, DocumentTextIcon, PlayCircleIcon  } from "@heroicons/react/20/solid";

export default function App() {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="w-5/6 bg-custom-green p-5 mt-10 rounded-3xl border-b-8 border-r-8 border-custom-green-dark text-white">
        <h1 className="text-4xl font-bold text-wrap text-center">Eco Card</h1>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-8 mt-20">
        <ButtonMenu route={"/viewGame"} title={"Jugar"} Icon={PlayCircleIcon } />
        <ButtonMenu route={"/viewScore"} title={"Puntajes"} Icon={ChartBarIcon} />
        <ButtonMenu route={"/viewRules"} title={"Reglas"} Icon={DocumentTextIcon} />
        <ButtonMenu route={"/viewRules"} title={"Descargar material"} />
      </div>
    </div>
  );
}
