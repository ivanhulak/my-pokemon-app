import React from "react";

type PokemonBreedingProps = {
  weight: number;
  height: number;
};
const CALC_HIGHT_KOEF = 3.281
const CALC_WEIGHT_KOEF = 2.205

export const PokemonBreeding: React.FC<PokemonBreedingProps> = ({
  weight,
  height,
}) => {
  const calculatedHeight = (height / CALC_HIGHT_KOEF).toFixed(2);
  const calculatedWeigth = (weight * CALC_WEIGHT_KOEF).toFixed(2);
  return (
    <div className="singlePokemon__block block-breeding">
      <h2 className="block-breeding__title block-title">Breeding</h2>
      <div className="block-breeding__info">
        <div className="block-breeding__param">
          <div className="block-breeding__name">Height</div>
          <div className="block-breeding__values">
            <div className="block-breeding__value">{height} ft</div>
            <div className="block-breeding__value">{calculatedHeight} m</div>
          </div>
        </div>
        <div className="block-breeding__param">
          <div className="block-breeding__name">Weight</div>
          <div className="block-breeding__values">
            <div className="block-breeding__value">{calculatedWeigth} lbs</div>
            <div className="block-breeding__value">{weight} kg</div>
          </div>
        </div>
      </div>
    </div>
  );
};
