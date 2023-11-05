import React from "react";
import { lazily } from 'react-lazily';
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./sass/main.scss";
import { useAppDispatch } from "./store/store";
import { setDeviceType } from "./store/slices/pokemons";
import { useScreenSize } from "./hooks/useScreenSize";
import { PokeballLoader } from "./components/PokeballLoader";

const { HomePage } = lazily(() => 
  import(/* webpackChunkName: "HomePage" */ './pages/HomePage'));
const { SinglePokemonPage } = lazily(() => 
  import(/* webpackChunkName: "SinglePokemonPage" */ './pages/SinglePokemonPage'));
const { ErrorPage } = lazily(() => 
  import(/* webpackChunkName: "ErrorPage" */ './pages/ErrorPage'));

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
          <Route path='/' element={
            <React.Suspense fallback={<PokeballLoader />}>
              <HomePage />
            </React.Suspense>
          } />
          <Route path='/pokemon/:id' element={
            <React.Suspense fallback={<PokeballLoader />}>
              <SinglePokemonPage />
            </React.Suspense>
          } />
          <Route path='*' element={
            <React.Suspense fallback={<PokeballLoader />}>
              <ErrorPage 
                callback={() => document.location.reload()} 
                error={'Not found page'}/>
            </React.Suspense>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
