import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header/Header";
import { SinglePokemonPage } from "./pages/SinglePokemonPage";
import "./sass/main.scss";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useAppDispatch } from "./store/store";
import { setDeviceType } from "./store/slices/pokemons";

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  
  // check if resize and react on it
  React.useEffect(() => {
    const handleLoadApp = () => {
      if(window.innerWidth <= 768) dispatch(setDeviceType(true))
      if(window.innerWidth > 768) dispatch(setDeviceType(false))
    }
    window.addEventListener('load', handleLoadApp)
    window.addEventListener('resize', handleLoadApp)
    return () => {
      window.removeEventListener('load', handleLoadApp)
      window.addEventListener('resize', handleLoadApp)
    }
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/pokemon/:id' element={<SinglePokemonPage />}/> 
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
