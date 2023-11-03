import React from "react";
import { StatusEnum } from "../@types/enums/StatusEnum";
import { FetchPokemonsParamsType } from "../@types/pokemons/fetchTypes";
import { Pagination } from "../components/Pagination";
import { PokemonsBlock } from "../components/Pokemons/PokemonsBlock";
import { PokemonTypes } from "../components/PokemonTypes";
import { clearSelectedTypes, setCurrentPage, setLimit, setSearch } from "../store/slices/filters";
import {
  fetchPokemons,
  setRecountAll,
  selectPokemonsData,
  fetchPokemonByName,
  fetchPokemonsByType,
} from "../store/slices/pokemons";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AllTypesType } from "../utils/allTypes";

export const HomePage: React.FC = () => {
  const [portionNumber, setPortionNumber] = React.useState(1);
  const isMounted = React.useRef(false)
  const dispatch = useAppDispatch();
  const { offsetPage, limit, search, selectedTypes } = useAppSelector((state) => state.filters);
  const { count, status, pages, portionSize, portionsCount, pokemonsInfoList, totalCount } =
    useAppSelector(selectPokemonsData);

  // ----- Handlers -----
  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage({ page, limit }));
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleLimitChange = (value: number) => {
    dispatch(setLimit(value))
  };
  const handleSeeAll = () => {
    fetchDataFunc()
    dispatch(setSearch(null))
  }

  // ---- Functions that loaded data ----
  const fetchDataFunc = () => {
    const params: FetchPokemonsParamsType = {
      offset: offsetPage,
      limit,
    };
    dispatch(fetchPokemons(params));
    dispatch(clearSelectedTypes())
  };

  // ---- Syncronises (UseEffects) -----
  React.useEffect(() => {
    if(search){
      dispatch(setCurrentPage({page: 0, limit}))
      dispatch(fetchPokemonByName({ search, totalCount, offset: offsetPage, limit }))
    } 
    if(selectedTypes){
      const params: {types: AllTypesType[] | undefined, limit: number, offset: number } = {
        types: selectedTypes?.items,
        offset: offsetPage,
        limit,
      };
      dispatch(fetchPokemonsByType(params))
    } if(search === null && selectedTypes === null){
      fetchDataFunc()
    }
      
  }, [dispatch, offsetPage, limit, search, totalCount]);
  React.useEffect(() => {
    dispatch(setRecountAll(limit));
  }, [dispatch, count, limit]);
  // set data to localStorage on second render
  React.useEffect(() => {
    if (isMounted.current){
      const obj = {
        limit,
      }
      const json = JSON.stringify(obj)
      localStorage.setItem('data', json)
    }
    isMounted.current = true
    dispatch(setRecountAll(limit))
    setPortionNumber(1)
  }, [limit])
  
  return (
    <>
      <PokemonTypes handleSeeAll={handleSeeAll}/>
      <PokemonsBlock fetchDataFunc={fetchDataFunc} />
      {status === StatusEnum.SUCCESS 
        && pokemonsInfoList.length !== 0
        && <Pagination 
              portionSize={portionSize}
              handleChangePage={handleChangePage}
              offsetPage={offsetPage}
              pages={pages}
              portionsCount={portionsCount}
              portionNumber={portionNumber}
              setPortionNumber={setPortionNumber}
              limit={limit}
              handleLimitChange={handleLimitChange}
            />
      }
    </>
  );
};
