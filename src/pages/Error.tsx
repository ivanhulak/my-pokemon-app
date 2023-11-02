import React from "react";
import { Link } from "react-router-dom";
import pickachu from "../assets/img/not-found-pikachu.png";
import { CommonBtn } from "../components/common/CommonBtn";

export const Error: React.FC<{ error: string | undefined, callback: () => void }> = ({ error, callback }) => {
  const onClickTryAgain = () => {
   callback()
  };
  return (
    <div className="error">
      <div className="container">
        <div className="error__body">
          <h2 className="error__title">Oops, some error happened</h2>
          <p className="error__message">{error}</p>
          <img src={pickachu} alt="not found pickachu" />
          <CommonBtn className="error__btn" onClick={onClickTryAgain}>Try Again</CommonBtn>
          <Link to='/'>
            <CommonBtn className="error__btn nav" onClick={onClickTryAgain}>Main Page</CommonBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};
