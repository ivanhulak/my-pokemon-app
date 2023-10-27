import React from 'react'
import pokemon from '../../assets/img/not-found-pikachu.png'

export const SinglePokemon: React.FC = () => {
  return (
    <div className="singlePokemon">
      <div className="container">
         <div className="singlePokemon__body">
            <div className="singlePokemon__block block-single">
               <div className="block-single__top">
                  <div className="block-single__info">
                     <div className="block-single__id">#0001</div>
                     <div className="block-single__name">Bulbasaur</div>
                  </div>
                  <div className="block-single__types">
                     <ul className="block-single__types-list">
                        <li>Grass</li>
                        <li>Poison</li>
                        <li>Poison</li>
                        <li>Poison</li>
                     </ul>
                  </div>
               </div>
               <div className="block-single__main">
                  <div className="block-single__stats stats-block">
                     <div className="stats-block__inner">
                        <div className="stats-block__stat">
                           <div className="stats-block__property">Hp</div>
                           <div className="stats-block__scale">
                              <div className="stats-block__scale-indicator"></div>
                           </div>
                        </div>
                        <div className="stats-block__stat">
                           <div className="stats-block__property">Attack</div>
                           <div className="stats-block__scale">
                              <div className="stats-block__scale-indicator"></div>
                           </div>
                        </div>
                        <div className="stats-block__stat">
                           <div className="stats-block__property">Defense</div>
                           <div className="stats-block__scale">
                              <div className="stats-block__scale-indicator"></div>
                           </div>
                        </div>
                     </div> 
                  </div>
                  <div className="block-single__image">
                     <img src={pokemon} alt="pokemon" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}