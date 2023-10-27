import React from "react";
import pickachu from "../assets/img/not-found-pikachu.png";
import { CommonBtn } from "./common/CommonBtn";

export const Error: React.FC<{ error: string, callback: () => void }> = ({ error, callback }) => {
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
          <CommonBtn className="error__btn" onClick={onClickTryAgain}>
            Try Again
          </CommonBtn>
        </div>
      </div>
    </div>
  );
};
