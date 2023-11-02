import React from "react";
import { StatusEnum } from "../@types/enums/StatusEnum";
import {
  FetchPokemonsByTypeParamsType,
  FetchPokemonsParamsType,
} from "../@types/pokemons/fetchTypes";
import { Pagination } from "../components/Pagination";
import { PokemonsBlock } from "../components/Pokemons/PokemonsBlock";
import { PokemonTypes } from "../components/PokemonTypes";
import { setCurrentPage, setLimit, setSearch } from "../store/slices/filters";
import {
  fetchPokemons,
  setPages,
  setRecountAll,
  fetchPokemonsByType,
  selectPokemonsData,
  fetchPokemonByName,
} from "../store/slices/pokemons";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AllTypesType } from "../utils/allTypes";

export const HomePage: React.FC = () => {
  const [portionNumber, setPortionNumber] = React.useState(1);
  const [isFounded, setIsFounded] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<AllTypesType | null>(null);
  const dispatch = useAppDispatch();
  const { offsetPage, limit, search } = useAppSelector((state) => state.filters);
  const { count, status, pages, portionSize, portionsCount, pokemonsInfoList } =
    useAppSelector(selectPokemonsData);

  // ----- Handlers that react on change page and limit ----
  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage({ page, limit }));
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleLimitChange = (value: number) => {
    dispatch(setLimit(value))
  };
  const handleSeeAll = () => {
    setIsFounded(false)
    fetchDataFunc()
    dispatch(setSearch(null))
    setSelectedType(null)
  }

  // ---- Functions that loaded data ----
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

  // ---- Syncronises (UseEffects) -----
  React.useEffect(() => {
    dispatch(setRecountAll(limit))
    setPortionNumber(1)
  }, [dispatch, limit])
  React.useEffect(() => {
    if (selectedType !== null) fetchDataByTypeFunc()
    if(selectedType === null) {
      fetchDataFunc()
      setSelectedType(null)
      dispatch(setSearch(null))
    };
  }, [dispatch, offsetPage, selectedType, limit]);
  React.useEffect(() => {
    dispatch(setPages(limit));
  }, [dispatch, count]);
  React.useEffect(() => {
    dispatch(setCurrentPage({page: 0, limit}))
    setPortionNumber(1)
  }, [dispatch, selectedType])

  
  React.useEffect(() => {
    if(search){
      setIsFounded(true)
      dispatch(fetchPokemonByName({ search }))
    }
  }, [dispatch, search])
  
  return (
    <>
      <PokemonTypes 
        setSelectedType={setSelectedType} 
        selectedType={selectedType}
        handleSeeAll={handleSeeAll}
      />
      <PokemonsBlock fetchDataFunc={fetchDataFunc} />
      {status === StatusEnum.SUCCESS 
        && pokemonsInfoList.length !== 0
        && !isFounded
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
      {isFounded && 
        <div className="container">
          <div className="pagination__settings">
            <div 
              className="pagination__settings-inner seeAll" 
              onClick={handleSeeAll}
            > 
              <div className="pagination__settings-text">See all pokemons</div>
            </div>
          </div> 
        </div> 
        }
    </>
  );
};
