import React from "react";
import { useParams } from "react-router-dom";
import { PokemonBreeding } from "../components/SinglePokemon/PokemonBreeding";
import { PokemonCard } from "../components/SinglePokemon/PokemonCard";
import { PokemonMoves } from "../components/SinglePokemon/PokemonMoves";
import { fetchSinglePokemon } from "../store/slices/pokemons";
import { useAppDispatch, useAppSelector } from "../store/store";

export const SinglePokemonPage: React.FC = () => {
  window.scroll({ behavior: "smooth", top: 0 });
  const dispatch = useAppDispatch();
  const params = useParams();
  const singlePokemon = useAppSelector(state => state.pokemons.singlePokemon);

  React.useEffect(() => {
    if(params.id){
      dispatch(fetchSinglePokemon({ id: Number(params.id) }))
    }
  }, []);

  return (
    <div className="singlePokemon">
      <div className="container">
        <div className="singlePokemon__body">
          <PokemonCard {...singlePokemon} />
          <PokemonBreeding
            weight={singlePokemon.weight}
            height={singlePokemon.height}
          />
          <PokemonMoves />
        </div>
      </div>
    </div>
  );
};
