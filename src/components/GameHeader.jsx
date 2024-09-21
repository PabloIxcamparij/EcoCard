import React, { useState, useEffect } from "react";

export default function GameHeader({ title, score }) {
  const [isShaking, setIsShaking] = useState(false);

  // Este efecto se ejecuta cada vez que cambia el puntaje
  useEffect(() => {
    setIsShaking(true);
    const timeout = setTimeout(() => setIsShaking(false), 500); // Duración de la animación
    return () => clearTimeout(timeout); // Limpiar el timeout para evitar problemas de memoria
  }, [score]);

  return (
    <div className="flex flex-col w-2/4 text-danger font-bold text-lg text-center">
      <h1>{title}</h1>
      <h1 className={`transition-transform ${isShaking ? 'animate-shake' : ''}`}>
        {score}
      </h1>
    </div>
  );
}
