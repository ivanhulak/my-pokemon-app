import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "./Search";
import back_arrow from '../assets/svg/back-arrow.svg';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          {location.pathname.includes("/pokemon/") ? (
            <Link to="/">
              <button className="header__back-btn">
                <img src={back_arrow} alt="back arrow button" />
              </button>
            </Link>
          ) : (
            <>
              <h2 className="header__title">Who are you searching for?</h2>
              <Search />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
