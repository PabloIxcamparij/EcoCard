import ButtonMenu from "../components/ButtonMenu";
import {
  ChartBarIcon,
  DocumentTextIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

export default function App() {
  const handleDownload = () => {
    // Crear un enlace temporal para la descarga
    const link = document.createElement("a");
    link.href = `/Documento TCU.pdf`; // URL del documento en public
    link.download = "Documento TCU.pdf"; // Nombre del archivo descargado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="w-5/6 bg-custom-green p-5 mt-10 rounded-3xl border-b-8 border-r-8 border-custom-green-dark text-white">
        <h1 className="text-4xl font-bold text-wrap text-center">Eco Card</h1>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-8 mt-20">
        <ButtonMenu route={"/viewGame"} title={"Jugar"} Icon={PlayCircleIcon} />
        <ButtonMenu
          route={"/viewScore"}
          title={"Puntajes"}
          Icon={ChartBarIcon}
        />
        <ButtonMenu
          route={"/viewRules"}
          title={"Reglas"}
          Icon={DocumentTextIcon}
        />

        <button
          className="flex text-start w-2/3 p-3 text-2xl font-bold bg-custom-green rounded-2xl text-white transform transition duration-250 hover:bg-custom-green-dark hover:scale-110 hover:-translate-y-4"
          onClick={handleDownload}
        >
          <DocumentTextIcon className="h-6 w-6 mr-3" />
          Descargar material
        </button>
        
      </div>
    </div>
  );
}
