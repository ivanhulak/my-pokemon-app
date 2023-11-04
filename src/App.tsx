import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./sass/main.scss";
import { useAppDispatch } from "./store/store";
import { setDeviceType } from "./store/slices/pokemons";
import { SinglePokemonPage } from "./pages/SinglePokemonPage";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { useScreenSize } from "./hooks/useScreenSize";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const screenSize: { width: number } = useScreenSize()

  React.useEffect(() => {
    const value = (screenSize.width <= 768) ? 'mobile' : 'desktop'
    dispatch(setDeviceType(value))
  }, [dispatch, screenSize])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/pokemon/:id' element={<SinglePokemonPage />}/> 
          <Route path='*' element={
            <ErrorPage 
              callback={() => document.location.reload()} 
              error={'Not found page'}/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
