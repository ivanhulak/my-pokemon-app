import React from "react";
import cn from "classnames";
import { allTypes, AllTypesType } from "../utils/some_data/allTypes";

type PokemonTypesProps = {
   selectedType: AllTypesType | null;
   setSelectedType: (t: AllTypesType) => void;
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ setSelectedType, selectedType }) => {

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
        </ul>
      </div>
    </div>
  );
};
