import React, { useState, useEffect } from "react";
import "./Landing.css";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga durante 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Redirigir a http://localhost:5173/ después de la carga
      setTimeout(() => {
        window.location.href = "http://localhost:5173/home";
      }, 4000);
    }
  }, [isLoading]);

  return (
    <div>
      <div className="container">
        <div class="spinner"></div>
      </div>
    </div>
  );
};

export default Landing;
