import cn from "classnames";
import React from "react";
import pokeball_icon from "../../assets/img/icons/pokeball.png";
import { setSearch } from "../../store/slices/filters";
import { useAppDispatch } from "../../store/store";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onHandleSearch = () => {
    inputRef.current?.blur()
    dispatch(setSearch(searchValue));
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
            <svg viewBox="0 0 488.4 488.4">
              <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>
            </svg>
          </div>
          <input
            ref={inputRef}
            className="header__search-input"
            type="text"
            placeholder="E.g. Pickachu"
            value={searchValue}
            onChange={handleInputChange}
          />
          {searchValue && <div className="header__search-clear" onClick={handleSearchClear}>
            <svg viewBox="0 0 24 24" fill="#595F65">
              <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#595F65"></path>
            </svg>
          </div>}
        </div>
      </div>
      <button className="header__search-btn" onClick={onHandleSearch} disabled={isActive}>
        <div className={cn("btn-pokeball", {'active': isActive})}>
          <img src={pokeball_icon} alt="" />
        </div>
        <span>Go</span>
      </button>
    </div>
  );
};
