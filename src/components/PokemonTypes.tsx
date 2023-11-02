import React from "react";
import cn from "classnames";
import { allTypes, AllTypesType } from "../utils/allTypes";

type PokemonTypesProps = {
   selectedType: AllTypesType | null;
   setSelectedType: (t: AllTypesType | null) => void;
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ selectedType, setSelectedType }) => {
  return (
    <div className="types">
      <div className="container">
        <ul className="types__row">
          {allTypes.map((t: AllTypesType) => (
            <li
              key={t.url}
              className={cn("types__type", { 'active': selectedType === t})}
              style={{ background: t.color }}
              onClick={() => setSelectedType(t)}
            >
              {t.name}
            </li>
          ))}
          <li 
            className={cn("types__type all", {'active': selectedType === null})} 
            onClick={() => setSelectedType(null)}
          >All</li>
        </ul>
      </div>
    </div>
  );
};
