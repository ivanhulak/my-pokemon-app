import React from "react";
import cn from "classnames";
import { allTypes, AllTypesType } from "../utils/allTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectFilters, setOffsetPage, setSearch, setSelectedTypes } from "../store/slices/filters";
import { fetchPokemonsByType } from "../store/reducers/fetchPokemonsByType";
import pokeball_icon from "../assets/img/pokeball.png";
import close_icon from "../assets/svg/close-blue.svg";
import close_icon_white from "../assets/svg/close-white.svg";
import { FetchByTypeParamsType } from "../@types/params-types";

type PokemonTypesProps = {
  handleSeeAll: () => void;
  setPortionNumber: (portion: number) => void;
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ handleSeeAll, setPortionNumber }) => {

  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const { selectedTypes, limit, offsetPage, search } = useAppSelector(selectFilters);

  const onHandleSelectType = (type: AllTypesType) => {
    dispatch(setSelectedTypes(type));
    setIsOpened(true);
  };

  const onHandleSearch = () => {
    if (search !== null) dispatch(setSearch(null));
    if (selectedTypes) {
      const params: FetchByTypeParamsType = {
        types: selectedTypes.items,
        offset: offsetPage,
        limit,
      };
      dispatch(setOffsetPage())
      setPortionNumber(1)
      dispatch(fetchPokemonsByType(params));
    }
    
    setIsOpened(false);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2000);
  };

  return (
    <div className="types">
      <div className="container">
        <div className="types__body">
          <ul className="types__row">
            {allTypes.map((t: AllTypesType) => (
              <li
                key={t.url}
                className={cn("types__type", {
                  active: selectedTypes?.items?.includes(t),
                  disabled: isActive,
                })}
                style={{ background: t.color }}
                onClick={() => onHandleSelectType(t)}
              >
                {t.name}
              </li>
            ))}
            <li
              className={cn("types__type all", {
                active: !selectedTypes,
                disabled: isActive,
              })}
              onClick={handleSeeAll}
            >
              All
            </li>
          </ul>
          <div
            className={cn("types__choice", {
              opened: isOpened && selectedTypes?.items?.length,
            })}
          >
            <ul className="types__choice-list">
              <div className="types__choice-text">Search by these types: </div>
              {selectedTypes?.items?.map((t: AllTypesType) => (
                <li
                  key={t.name}
                  className="types__type choosen"
                  style={{ background: t.color }}
                  onClick={() => onHandleSelectType(t)}
                >
                  {t.name}
                  <img
                    className="types__type-closeIcon"
                    src={close_icon_white}
                    alt="close"
                  />
                </li>
              ))}
              <button
                className={cn("types__search-btn", {
                  hidden: !selectedTypes?.items?.length,
                })}
                onClick={onHandleSearch}
                disabled={isActive || !selectedTypes?.items?.length}
              >
                <div className={cn("btn-pokeball", { active: isActive })}>
                  <img src={pokeball_icon} alt="pokeball" />
                </div>
                <span>Go</span>
              </button>
            </ul>
            <img
              onClick={() => setIsOpened(false)}
              className="types__choice-closeIcon"
              src={close_icon}
              alt="close"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
