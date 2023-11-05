import cn from "classnames";
import React from "react";
import { clearSelectedTypes, selectFilters, setCurrentPage, setSearch } from "../store/slices/filters";
import { useAppDispatch, useAppSelector } from "../store/store";
import pokeball_icon from "../assets/img/pokeball.png";
import searchIcon from '../assets/svg/search.svg';
import closeIcon from '../assets/svg/close.svg';
import { fetchPokemonByName } from "../store/reducers/fetchPokemonByName";

export const Search: React.FC = () => {

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const { selectedTypes, offsetPage, limit} = useAppSelector(selectFilters)
  const totalCount = useAppSelector(state => state.pokemons.totalCount)
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onHandleSearch()
  }

  const onHandleSearch = () => {
    if(selectedTypes !== null){
      if(window.confirm('Choosen types need to be reseted to make new search!\nDo you agree reset all types?')){
        dispatch(clearSelectedTypes())
      }
    }
    inputRef.current?.blur()
    dispatch(setSearch(searchValue));
    dispatch(setCurrentPage({page: 0, limit}))
    dispatch(fetchPokemonByName({ search: searchValue, totalCount, offset: offsetPage, limit }))
    setSearchValue('');
    setIsActive(true)
    setTimeout(() => {
      setIsActive(false)
    }, 2000);
  };
  
  const handleSearchClear = () => {
    setSearchValue('');
    inputRef.current?.focus()
  };

  return (
    <div className="header__search">
      <div className="header__search-box">
        <div className="header__search-inner-box">
          <div className="header__search-loupe">
            <img src={searchIcon} alt="search icon" />
          </div>
          <input
            ref={inputRef}
            className="header__search-input"
            type="text"
            placeholder="E.g. Pikachu"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={onHandleKeyDown}
            disabled={isActive}
          />
          {searchValue && 
            <div className="header__search-close" onClick={handleSearchClear}>
              <img src={closeIcon} alt="close icon" />
            </div>
          }
        </div>
      </div>
      <button 
        className="header__search-btn" 
        onClick={onHandleSearch} 
        disabled={isActive || !searchValue}
      >
        <div className={cn("btn-pokeball", {'active': isActive})}>
          <img src={pokeball_icon} alt="pokeball" />
        </div>
        <span>Go</span>
      </button>
    </div>
  );
};
