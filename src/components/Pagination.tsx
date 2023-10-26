import React from "react";
import cn from "classnames";
import { setCurrentPage } from "../store/slices/filters";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";

const pages = [0, 1, 2, 3];
export const Pagination: React.FC = () => {
  const { offsetPage } = useSelector((state: any) => state.filters)
  const dispatch = useAppDispatch()
  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
    window.scroll({top: 0, behavior: 'smooth'})
  };
  return (
    <div className="pagination">
      <div className="container">
        <div className="pagination__body">
          <button className="pagination__btn pagination__btn--prev" disabled={offsetPage === 0}>
            <svg
              version="1.1"
              id="Icons"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              transform="rotate(180)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M22.7,16.7l-4,4C18.5,20.9,18.3,21,18,21s-0.5-0.1-0.7-0.3 c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h10.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4 c0.1,0.1,0.2,0.2,0.2,0.3c0.1,0.2,0.1,0.5,0,0.8C22.9,16.5,22.8,16.6,22.7,16.7z"></path>{" "}
              </g>
            </svg>
          </button>
          <ul className="pagination__list">
            {pages.map((p, idx) => (
              <li 
                key={idx} 
                onClick={() => handleChangePage(p)}
                className={cn({ 'active': p * 10 === offsetPage })}
              >
                {p + 1}
              </li>
            ))}
          </ul>
          <button className="pagination__btn pagination__btn--next">
            <svg
              version="1.1"
              id="Icons"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M22.7,16.7l-4,4C18.5,20.9,18.3,21,18,21s-0.5-0.1-0.7-0.3 c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h10.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4 c0.1,0.1,0.2,0.2,0.2,0.3c0.1,0.2,0.1,0.5,0,0.8C22.9,16.5,22.8,16.6,22.7,16.7z"></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
