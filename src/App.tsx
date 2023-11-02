import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header/Header";
import { SinglePokemonPage } from "./pages/SinglePokemonPage";
import "./sass/main.scss";
import { HomePage } from "./pages/HomePage";
import { useAppDispatch } from "./store/store";
import { setDeviceType } from "./store/slices/pokemons";
import { Error } from "./pages/Error";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // check if resize and react on it
  React.useEffect(() => {
    const handleLoadApp = () => {
      if (window.innerWidth <= 768) dispatch(setDeviceType(true));
      if (window.innerWidth > 768) dispatch(setDeviceType(false));
    };
    window.addEventListener("load", handleLoadApp);
    window.addEventListener("resize", handleLoadApp);
    return () => {
      window.removeEventListener("load", handleLoadApp);
      window.removeEventListener("resize", handleLoadApp);
    };
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/pokemon/:id' element={<SinglePokemonPage />}/> 
          <Route path='*' element={
            <Error 
              callback={() => document.location.reload()} 
              error={'Not found page'}/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
