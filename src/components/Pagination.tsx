import React from "react";
import cn from "classnames";

type PaginationProps = {
  portionSize: number;
  handleChangePage: (page: number) => void;
  offsetPage: number;
  pages: number[];
  portionsCount: number;
  portionNumber: number;
  setPortionNumber: (prev: any) => void;
  limit: number;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
  handleSelectChange
}) => {
  const leftPortion = (portionNumber - 1) * portionSize + 1;
  const rightPortion = portionNumber * portionSize;

  const handlePrevPage = () => {
    setPortionNumber((prev: number) => prev - 1);
  };
  const handleNextPage = () => {
    setPortionNumber((prev: number) => prev + 1);
  };

  return (
    <div className="pagination">
      <div className="container">
        <div className="pagination__body">
          <button
            className="pagination__btn pagination__btn--prev"
            onClick={handlePrevPage}
            disabled={portionNumber === 1}
          >
            <svg viewBox="0 0 32 32" transform="rotate(180)">
              <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M22.7,16.7l-4,4C18.5,20.9,18.3,21,18,21s-0.5-0.1-0.7-0.3 c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h10.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4 c0.1,0.1,0.2,0.2,0.2,0.3c0.1,0.2,0.1,0.5,0,0.8C22.9,16.5,22.8,16.6,22.7,16.7z"></path>
            </svg>
          </button>
          <ul className="pagination__list">
            {pages
              .filter((p: number) => p >= leftPortion && p <= rightPortion)
              .map((p: number) => (
                <li
                  key={p}
                  onClick={() => handleChangePage(p - 1)}
                  className={cn({ active: (p - 1) * 10 === offsetPage })}
                >
                  {p}
                </li>
              ))}
          </ul>
          <button
            className="pagination__btn pagination__btn--next"
            onClick={handleNextPage}
            disabled={portionsCount === portionNumber}
          >
            <svg viewBox="0 0 32 32">
              <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M22.7,16.7l-4,4C18.5,20.9,18.3,21,18,21s-0.5-0.1-0.7-0.3 c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h10.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4 c0.1,0.1,0.2,0.2,0.2,0.3c0.1,0.2,0.1,0.5,0,0.8C22.9,16.5,22.8,16.6,22.7,16.7z"></path>
            </svg>
          </button>
        </div>
        <div className="pagination__settings">
          <div className="pagination__settings-text">
            Show
            <select
              name="show-per-page"
              onChange={handleSelectChange}
              value={limit}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            pokemons per page
          </div>
        </div>
      </div>
    </div>
  );
};
