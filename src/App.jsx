function App() {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center w-screen h-screen bg-[#F2E8CF] p-5 gap-8 overflow-hidden">
        
        <div className="w-5/6 bg-custom-green-light flex justify-center items-center rounded-3xl p-5 border-b-8 border-r-8 border-custom-green-dark text-white">
          <h1 className="text-4xl font-bold text-wrap text-center">
           Eco Card
          </h1>
        </div>

        <div className="w-5/6 flex flex-col justify-center items-center gap-8 mt-10">
          <button className="w-3/5  text-2xl font-bold bg-custom-green-light p-2 rounded-2xl hover:bg-custom-green-dark text-white">
            Jugar
          </button>

          <button className="w-3/5 text-2xl font-bold bg-custom-green-light p-2 rounded-2xl hover:bg-custom-green-dark text-white">
            Puntajes
          </button>

          <button className="w-3/5  text-2xl font-bold bg-custom-green-light p-2 rounded-2xl hover:bg-custom-green-dark text-white">
            Descargar material
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
