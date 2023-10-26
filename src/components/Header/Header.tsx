import React from "react";
import { Search } from "./Search";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <h2 className="header__title">Who are you searching for?</h2>
          <Search />
        </div>
      </div>
    </header>
  );
};
