import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header/Header';
import { Pagination } from './components/Pagination';
import { PokemonsBlock } from './components/Pokemons/PokemonsBlock';
import './sass/main.scss';

export const App: React.FC = () => {

  return (
    <div className='wrapper'>
      <Header />
      <div className="content">
        <PokemonsBlock />
        <Pagination />
      </div>
      <Footer />
    </div>
  );
}

export default App;
