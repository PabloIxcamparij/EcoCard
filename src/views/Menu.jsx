import { NavLink } from "react-router-dom";
import { Howl } from "howler";
import { useEffect } from "react";

function App() {
  const backgroundMusic = new Howl({
    src: ["/songs/Ost.mp3"],
    loop: true,
    volume: 0.2,
  });

  useEffect(()=>{
    backgroundMusic.play()
  }, [])
  
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-custom-white">

        <div className="w-5/6 bg-custom-green-light flex justify-center items-center rounded-3xl p-5 border-b-8 border-r-8 border-custom-green-dark text-white">
          <h1 className="text-4xl font-bold text-wrap text-center">Eco Card</h1>
        </div>

        <div className="w-5/6 flex flex-col justify-center items-center gap-8 mt-10">
          <NavLink to="/viewGame" className="w-3/5">
            <button className="w-full  text-2xl font-bold bg-custom-green-light p-2 rounded-2xl hover:bg-custom-green-dark text-white">
              Jugar
            </button>
          </NavLink>

          <NavLink to="/viewScore" className="w-3/5">
            <button className="w-full text-2xl font-bold bg-custom-green-light p-2 rounded-2xl hover:bg-custom-green-dark text-white">
              Puntajes
            </button>
          </NavLink>

          <NavLink to="/viewRules" className="w-3/5">
            <button className="w-full  text-2xl font-bold bg-custom-green-light p-2 rounded-2xl hover:bg-custom-green-dark text-white">
              Reglas
            </button>
          </NavLink>

          <button className="w-3/5  text-2xl font-bold bg-custom-green-light p-2 rounded-2xl hover:bg-custom-green-dark text-white">
            Descargar material
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
