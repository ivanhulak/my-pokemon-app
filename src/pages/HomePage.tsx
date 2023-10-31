import React from "react";
import { useSelector } from "react-redux";
import { StatusEnum } from "../@types/enums/StatusEnum";
import {
  FetchPokemonsByTypeParamsType,
  FetchPokemonsParamsType,
  FetchPokemonsType,
} from "../@types/pokemons/fetchTypes";
import { Pagination } from "../components/Pagination";
import { PokemonsBlock } from "../components/Pokemons/PokemonsBlock";
import { PokemonTypes } from "../components/PokemonTypes";
import { setCurrentPage, setLimit, setSearch } from "../store/slices/filters";
import {
  fetchPokemons,
  setPokemonsByName,
  setPages,
  setRecountAll,
  fetchPokemonsByType,
} from "../store/slices/pokemons";
import { useAppDispatch } from "../store/store";
import { AllTypesType } from "../utils/some_data/allTypes";

export const HomePage: React.FC = () => {
  const [portionNumber, setPortionNumber] = React.useState(1);
  const [selectedType, setSelectedType] = React.useState<AllTypesType | null>(null);
  const dispatch = useAppDispatch();
  const { offsetPage, limit, search } = useSelector((state: any) => state.filters);
  const { count, status, pages, portionSize, portionsCount, pokemonsInfoList } =
    useSelector((state: any) => state.pokemons);

  // ----- Handlers that react on change page and limit ----
  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage({ page, limit }));
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(event.target.value)));
  };

  // ---- Functions that loaded data ----
  const fetchDataFunc = () => {
    const params: FetchPokemonsParamsType = {
      offset: offsetPage,
      limit,
    };
    dispatch(fetchPokemons(params));
    setSelectedType(null)
    dispatch(setSearch(null))
  };
  const fetchDataByTypeFunc = () => {
    if (selectedType) {
      const params: FetchPokemonsByTypeParamsType = {
        url: selectedType.url,
        selectedType,
        offset: offsetPage,
        limit,
      };
      dispatch(fetchPokemonsByType(params));
    } else {
      fetchDataFunc();
    }
  };

  // ---- Syncronises (UseEffects) -----
  React.useEffect(() => {
    dispatch(setRecountAll(limit))
    setPortionNumber(1)
  }, [limit])
  React.useEffect(() => {
    if (selectedType !== null) fetchDataByTypeFunc()
    if(selectedType === null) fetchDataFunc();
  }, [offsetPage, selectedType, limit]);
  React.useEffect(() => {
    dispatch(setPages(limit));
  }, [count]);
  React.useEffect(() => {
    dispatch(setCurrentPage({page: 0, limit}))
    setPortionNumber(1)
  }, [selectedType])
  React.useEffect(() => {
    if(search){
      dispatch(setPokemonsByName(search))
    }
  }, [search])
  
  return (
    <>
      <PokemonTypes setSelectedType={setSelectedType} selectedType={selectedType}/>
      <PokemonsBlock fetchDataFunc={fetchDataFunc} />
      {status === StatusEnum.SUCCESS && pokemonsInfoList.length && (
        <Pagination
          portionSize={portionSize}
          handleChangePage={handleChangePage}
          offsetPage={offsetPage}
          pages={pages}
          portionsCount={portionsCount}
          portionNumber={portionNumber}
          setPortionNumber={setPortionNumber}
          limit={limit}
          handleSelectChange={handleSelectChange}
        />
      )}
    </>
  );
};
