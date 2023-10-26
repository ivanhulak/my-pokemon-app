import React from "react";
import pokeball_loader from "../assets/img/pokeball-loader.gif";

export const PokeballLoader: React.FC = () => {
  return (
    <div className="loader">
      <img src={pokeball_loader} alt="pokeball loader" />
    </div>
  );
};
