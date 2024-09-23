import ButtonMusic from "../components/ButtonMusic";
import ButtonMenu from "../components/ButtonMenu";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-custom-bg bg-cover bg-center">
      <div className="w-5/6 bg-custom-green flex justify-center items-center rounded-3xl p-5 border-b-8 border-r-8 border-custom-green-dark text-white">
        <h1 className="text-4xl font-bold text-wrap text-center">Eco Card</h1>
      </div>

      <div className="w-full flex flex-col gap-8 mt-10 ml-10">

      <ButtonMenu route={"viewGame"} title={"Jugar"}/>

      <ButtonMenu route={"viewScore"} title={"Puntajes"}/>

      <ButtonMenu route={"viewRules"} title={"Reglas"}/>

      <ButtonMenu route={"viewRules"} title={"Descargar material"}/>

      <ButtonMusic />
      </div>

    </div>
  );
}
