import React from "react";
import { useSelector } from "react-redux";
import { PokemonType } from "../../@types/pokemons/common";
import { setCurrentPage } from "../../store/slices/filters";
import { StatusEnum, fetchPokemons, setPages } from "../../store/slices/pokemons";
import { useAppDispatch } from "../../store/store";
import { Error } from "../Error";
import { Pagination } from "../Pagination";
import { LoadingPokemon } from "./LoadingPokemon";
import { Pokemon, PokemonInfoType } from "./Pokemon";

export type FetchPokemonsType = {
  count: number;
  results: PokemonType[];
  next: string | null;
  prev: string | null;
};

export type FetchPokemonsParamsType = {
  offset: number;
  limit: number;
};

export const PokemonsBlock: React.FC = () => {
  const [portionNumber, setPortionNumber] = React.useState(1)
  const dispatch = useAppDispatch();
  const { offsetPage, limit } = useSelector((state: any) => state.filters);
  const { 
    count,
    status, 
    pokemonsInfoList, 
    errorMessage,
    pages, 
    portionSize, 
    portionsCount
  } = useSelector((state: any) => state.pokemons);

  const fetchDataFunc = () => {
    const params: FetchPokemonsParamsType = {
      offset: offsetPage,
      limit,
    };
    dispatch(fetchPokemons(params));
  };

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scroll({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    fetchDataFunc();
  }, [offsetPage]);

  React.useEffect(() => {
    console.log('dispatch')
    dispatch(setPages())
  }, [count])

  const skeleton = Array(10).fill(null).map((_, idx) => <LoadingPokemon key={idx} />);
  const pokemonItems = pokemonsInfoList.map((pkmn: PokemonInfoType) => (
    <Pokemon key={pkmn.url} {...pkmn} />
  ));

  return (
    <>
      <div className="pokemons">
        {status === StatusEnum.ERROR ? (
          <Error error={errorMessage} callback={fetchDataFunc} />
        ) : (
          <div className="container">
            <div className="pokemons__box box-pokemons">
              {status === StatusEnum.LOADING ? skeleton : pokemonItems}
            </div>
          </div>
        )}
      </div>
      {status === StatusEnum.SUCCESS && 
        <Pagination
          portionSize={portionSize} 
          handleChangePage={handleChangePage} 
          offsetPage={offsetPage}
          pages={pages}
          portionsCount={portionsCount}
          portionNumber={portionNumber}
          setPortionNumber={setPortionNumber}
      />}
    </>
  );
};
