import React from "react";
import cn from "classnames";
import pag_btn from "../assets/svg/pag-btn.svg";
import { Select } from "./Select";

type PaginationProps = {
  portionSize: number;
  handleChangePage: (page: number) => void;
  offsetPage: number;
  pages: number[];
  portionsCount: number;
  portionNumber: number;
  setPortionNumber: (prev: any) => void;
  limit: number;
  handleLimitChange: (limit: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  portionSize,
  handleChangePage,
  offsetPage,
  pages,
  portionsCount,
  portionNumber,
  setPortionNumber,
  limit,
  handleLimitChange,
}) => {
  const leftPortion = (portionNumber - 1) * portionSize + 1;
  const rightPortion = portionNumber * portionSize;

  const handlePrev = () => {
    setPortionNumber((prev: number) => prev - 1);
  };
  const handleNext = () => {
    setPortionNumber((prev: number) => prev + 1);
  };

  return (
    <div className="pagination">
      <div className="container">
        <div className="pagination__body">
          <button
            className="pagination__btn pagination__btn--prev"
            onClick={handlePrev}
            disabled={portionNumber === 1}
          >
            <img src={pag_btn} alt="pagination prev button" />
          </button>
          <ul className="pagination__list">
            {pages
              .filter((p: number) => p >= leftPortion && p <= rightPortion)
              .map((p: number) => (
                <li
                  key={p}
                  onClick={() => handleChangePage(p - 1)}
                  className={cn({ 'active': (p - 1) * limit === (Math.ceil(offsetPage / limit)) * limit })}
                >
                  {p}
                </li>
              ))}
          </ul>
          <button
            className="pagination__btn pagination__btn--next"
            onClick={handleNext}
            disabled={portionsCount === portionNumber}
          >
            <img src={pag_btn} alt="pagination next button" />
          </button>
        </div>
        <div className="pagination__settings">
          <div className="pagination__settings-inner">
            <div className="pagination__settings-text">Show</div>
            <Select 
              onOptionChange={handleLimitChange}
              currentOption={limit}
            />
            <div className="pagination__settings-text">pokemons per page</div>
          </div>
        </div>
      </div>
    </div>
  );
};
