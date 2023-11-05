import React from "react";
import { StatusEnum } from "../@types/enums/StatusEnum";
import { FetchByTypeParamsType, FetchPokemonsParamsType } from "../@types/params-types";
import { Pagination } from "../components/Pagination";
import { PokemonsBlock } from "../components/PokemonsBlock";
import { PokemonTypes } from "../components/PokemonTypes";
import { fetchPokemonByName } from "../store/reducers/fetchPokemonByName";
import { fetchPokemons } from "../store/reducers/fetchPokemons";
import { fetchPokemonsByType } from "../store/reducers/fetchPokemonsByType";
import { clearSelectedTypes, selectFilters, setCurrentPage, setLimit, setSearch } from "../store/slices/filters";
import { setRecountAll, selectPokemons } from "../store/slices/pokemons";
import { useAppDispatch, useAppSelector } from "../store/store";

export const HomePage: React.FC = () => {

  const [portionNumber, setPortionNumber] = React.useState(1);
  const isMounted = React.useRef(false)
  const dispatch = useAppDispatch();
  const { offsetPage, limit, search, selectedTypes } = useAppSelector(selectFilters);
  const { status, pages, portionSize, portionsCount, pokemonsInfoList, totalCount } =
    useAppSelector(selectPokemons);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage({ page, limit }));
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleLimitChange = (value: number) => {
    dispatch(setLimit({value, offsetPage}))
  };
  const handleSeeAll = () => {
    fetchDataFunc()
    if(search) dispatch(setSearch(null))
    dispatch(clearSelectedTypes())
  }
  const handlePortionNumber = (offset: number, limit: number, portionSize: number) => {
    const page = Math.ceil(offset / limit) + 1
    const currentPortion = Math.ceil(page / portionSize)
    setPortionNumber(currentPortion)
  }

  const fetchDataFunc = React.useCallback(() => {
    const params: FetchPokemonsParamsType = {
      offset: offsetPage,
      limit,
    };
    dispatch(fetchPokemons(params));
  }, [dispatch, offsetPage, limit])

  React.useEffect(() => {
    if(search){
      dispatch(fetchPokemonByName({ search, totalCount, offset: offsetPage, limit }))
      if(pokemonsInfoList.length <= limit) setPortionNumber(1)
    } 
    if(selectedTypes){
      const params: FetchByTypeParamsType = {
        types: selectedTypes?.items,
        offset: offsetPage,
        limit,
      };
      dispatch(fetchPokemonsByType(params))
    } 
    if(search === null && selectedTypes === null) fetchDataFunc()
  }, [dispatch, offsetPage, limit, search, totalCount]);

  React.useEffect(() => {
    if (isMounted.current){
      const json = JSON.stringify({ limit })
      localStorage.setItem('data', json)
    }
    isMounted.current = true
    handlePortionNumber(offsetPage, limit, portionSize)
    dispatch(setRecountAll(limit));
  }, [dispatch, limit])
  
  return (
    <>
      <PokemonTypes handleSeeAll={handleSeeAll} setPortionNumber={setPortionNumber}/>
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
