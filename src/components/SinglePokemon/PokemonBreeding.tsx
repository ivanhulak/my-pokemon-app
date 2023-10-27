import React from "react";

type PokemonBreedingProps = {
  weight: number;
  height: number;
};

export const PokemonBreeding: React.FC<PokemonBreedingProps> = ({
  weight,
  height,
}) => {
  const calculatedHeight = (height / 3.281).toFixed(2);
  const calculatedWeigth = (weight * 2.205).toFixed(2);
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
