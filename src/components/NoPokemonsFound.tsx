import React from "react";
import pickachu from "../assets/img/not-found-pikachu.png";
import { CommonBtn } from "./common/CommonBtn";

export const NoPokemonsFound: React.FC<{callback: () => void}> = ({callback}) => {
  const onClickSearchOther = () => {
    callback()
  }
  return (
    <div className="noPokemons">
      <div className="container">
        <div className="noPokemons__body">
          <h2 className="noPokemons__title">No one pokemons found</h2>
          <img src={pickachu} alt="not found pickachu" />
          <CommonBtn className="noPokemons__btn" onClick={onClickSearchOther}>
            Search other
          </CommonBtn>
        </div>
      </div>
    </div>
  );
};
