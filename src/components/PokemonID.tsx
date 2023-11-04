import { padStart } from "lodash";
import React from 'react'

type PokemonIDProps = {
   id: number;
   className: string;
}

export const PokemonID: React.FC<PokemonIDProps> = ({id, className}) => {

  return <div className={className}>#{padStart(id?.toString(), 4, "0")}</div>
}