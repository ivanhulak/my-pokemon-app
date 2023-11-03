import React from "react";
import cn from "classnames";
import { allTypes, AllTypesType } from "../utils/allTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearSelectedTypes, setSearch, setSelectedTypes } from "../store/slices/filters";
import pokeball_icon from "../assets/icons/pokeball.png";
import { fetchPokemonsByType } from "../store/reducers/fetchPokemonsByType";
import close_icon from '../assets/svg/close-blue.svg';
import close_icon_black from '../assets/svg/close-black.svg';

type PokemonTypesProps = {
   handleSeeAll: () => void;
}

export const PokemonTypes: React.FC<PokemonTypesProps> = (
  { handleSeeAll  }) => {
    const dispatch = useAppDispatch()
    const [isActive, setIsActive] = React.useState(false);
    const [isOpened, setIsOpened] = React.useState(false);
    const { selectedTypes, limit, offsetPage, search } = useAppSelector(state => state.filters)

    const onHandleSelectType = (type: AllTypesType) => {
      dispatch(setSelectedTypes(type))
      setIsOpened(true)
    }

    const onHandleSearch = () => {
      if(selectedTypes){
        const params: {types: AllTypesType[] | undefined, limit: number, offset: number } = {
          types: selectedTypes.items,
          offset: offsetPage,
          limit,
        };
        dispatch(fetchPokemonsByType(params));
      }
      if(search !== null){
        dispatch(setSearch(null))
      }
      setIsOpened(false)
      setIsActive(true)
      setTimeout(() => {
        setIsActive(false)
      }, 2000);
    }

    React.useEffect(() => {
      if(!selectedTypes?.items?.length) dispatch(clearSelectedTypes())
    }, [dispatch, selectedTypes])

  return (
    <div className="types">
      <div className="container">
        <div className="types__body">
          <ul className="types__row">
            {allTypes.map((t: AllTypesType) => (
              <li
                key={t.url}
                className={cn("types__type", { 
                  'active': selectedTypes?.items?.includes(t),
                  'disabled': isActive
                })}
                style={{ background: t.color }}
                onClick={() => onHandleSelectType(t)}
              >
                {t.name}
              </li>
            ))}
            <li
              className={cn("types__type all", {
                'active': !selectedTypes,
                'disabled': isActive
              })} 
              onClick={handleSeeAll}
            >All</li>
          </ul>
          <div className={cn("types__choice", {
            'opened': isOpened && selectedTypes?.items?.length
            })}>
            <ul className="types__choice-list">
              <div className="types__choice-text">Search by these types: </div>
              {selectedTypes?.items?.map((t: AllTypesType) => (
                <li
                  key={t.name}
                  className="types__type choosen"
                  onClick={() => onHandleSelectType(t)}
                >{t.name}
                  <img className="types__type-closeIcon" src={close_icon_black} alt="close" />
                </li> 
              ))}
              <button 
                className={cn('types__search-btn', {'hidden': !selectedTypes?.items?.length})}
                onClick={onHandleSearch} 
                disabled={isActive || !selectedTypes?.items?.length}
              >
                <div className={cn("btn-pokeball", {'active': isActive})}>
                  <img src={pokeball_icon} alt="pokeball" />
                </div>
                <span>Go</span>
              </button>
            </ul>
            <img
              onClick={() => setIsOpened(false)}
              className="types__choice-closeIcon" 
              src={close_icon} alt="close" />
          </div>
        </div>
      </div>
    </div>
  );
};
