import React from "react";
import { useSelector } from "react-redux";
import { StatusEnum } from "../@types/enums/StatusEnum";
import {
  FetchPokemonsByTypeParamsType,
  FetchPokemonsParamsType,
} from "../@types/pokemons/fetchTypes";
import { Pagination } from "../components/Pagination";
import { PokemonsBlock } from "../components/Pokemons/PokemonsBlock";
import { PokemonTypes } from "../components/PokemonTypes";
import { setCurrentPage } from "../store/slices/filters";
import {
  fetchPokemons,
  fetchPokemonsByType,
  setPages,
} from "../store/slices/pokemons";
import { useAppDispatch } from "../store/store";
import { AllTypesType } from "../utils/some_data/allTypes";

export const HomePage: React.FC = () => {
  const [portionNumber, setPortionNumber] = React.useState(1);
  const [selectedType, setSelectedType] = React.useState<AllTypesType | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { offsetPage, limit } = useSelector((state: any) => state.filters);
  const { count, status, pages, portionSize, portionsCount, pokemonsInfoList } =
    useSelector((state: any) => state.pokemons);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const fetchDataFunc = () => {
    const params: FetchPokemonsParamsType = {
      offset: offsetPage,
      limit,
    };
    dispatch(fetchPokemons(params));
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

  React.useEffect(() => {
    if (selectedType !== null) fetchDataByTypeFunc()
    if(selectedType === null) fetchDataFunc();
  }, [offsetPage, selectedType]);

  React.useEffect(() => {
    dispatch(setPages());
  }, [count]);
  React.useEffect(() => {
    dispatch(setCurrentPage(0))
  }, [selectedType])

  return (
    <>
      <PokemonTypes
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
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
        />
      )}
    </>
  );
};
