import React from "react";
import { useParams } from "react-router-dom";
import { PokemonBreeding } from "../components/PokemonBreeding";
import { PokemonCard } from "../components/PokemonCard";
import { fetchSinglePokemon } from "../store/reducers/fetchSinglePokemon";
import { useAppDispatch, useAppSelector } from "../store/store";

export const SinglePokemonPage: React.FC = () => {

  window.scroll({ behavior: "smooth", top: 0 });
  const dispatch = useAppDispatch();
  const params = useParams();
  const singlePokemon = useAppSelector(state => state.pokemons.singlePokemon);

  React.useEffect(() => {
    if(params.id) dispatch(fetchSinglePokemon({ id: Number(params.id) }))
  }, [dispatch, params.id]);

  return (
    <div className="singlePokemon">
      <div className="container">
        <div className="singlePokemon__body">
          <PokemonCard {...singlePokemon} />
          <PokemonBreeding weight={singlePokemon.weight} height={singlePokemon.height}/>
        </div>
      </div>
    </div>
  );
};
