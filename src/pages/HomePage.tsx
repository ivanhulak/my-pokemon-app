import React from "react";
import { useSelector } from "react-redux";
import { FetchPokemonsByTypeParamsType, FetchPokemonsParamsType } from "../@types/pokemons/fetchTypes";
import { Pagination } from "../components/Pagination";
import { PokemonsBlock } from "../components/Pokemons/PokemonsBlock";
import { PokemonTypes } from "../components/PokemonTypes";
import { setCurrentPage } from "../store/slices/filters";
import { fetchPokemons, fetchPokemonsByType, setPages, StatusEnum } from "../store/slices/pokemons";
import { useAppDispatch } from "../store/store";
import { AllTypesType } from "../utils/some_data/allTypes";

export const HomePage: React.FC = () => {
  const [portionNumber, setPortionNumber] = React.useState(1);
  const [selectedType, setSelectedType] = React.useState<AllTypesType | null>(null);
  const dispatch = useAppDispatch();
  const { offsetPage, limit } = useSelector((state: any) => state.filters);
  const { count, status, pages, portionSize, portionsCount, pokemonsInfoList } = useSelector(
    (state: any) => state.pokemons
  );
   console.log('selectedType', selectedType)
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

  React.useEffect(() => {
    fetchDataFunc();
  }, [offsetPage]);

  React.useEffect(() => {
    dispatch(setPages());
  }, [count]);

  React.useEffect(() => {
   if(selectedType){
      const params: FetchPokemonsByTypeParamsType = {
         url: selectedType.url,
         selectedType,
      }
      dispatch(fetchPokemonsByType(params))
   } else {
      fetchDataFunc()
   }
  }, [selectedType])

  return (
    <>
      <PokemonTypes setSelectedType={setSelectedType} selectedType={selectedType}/>
      <PokemonsBlock fetchDataFunc={fetchDataFunc}/>
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
