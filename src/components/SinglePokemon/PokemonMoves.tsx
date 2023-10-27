import React from 'react'

export const PokemonMoves: React.FC = () => {
  return (
    <div className="singlePokemon__block block-moves">
      <div className="block-moves__top">
         <h2 className="block-moves__title block-title">Moves</h2>
         <div className="block-moves__seeAll">See all</div>
      </div>
      <div className="block-moves__moves moves-block">
         <div className="moves-block__item">
            <div className="moves-block__item-inner">
               <div className="moves-block__icon">
                  <img src="" alt="move icon" />
               </div>
               <div className="moves-block__name">Move #1</div>
            </div>
         </div>
      </div>
    </div>
  )
}