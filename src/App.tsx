import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header/Header";
import { SinglePokemon } from "./components/pages/SinglePokemon";
import { PokemonsBlock } from "./components/Pokemons/PokemonsBlock";
import "./sass/main.scss";

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<PokemonsBlock />}/>
          <Route path='/pokemon/:id' element={<SinglePokemon />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
