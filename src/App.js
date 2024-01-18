import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import seedColors from './seedColors';
import Home from './Home';
import Shades from './Shades';
import SinglePalette from './SinglePalette';
import NewPaletteForm from './NewPaletteForm';
import generatePAlette from './ColorHelper';
import ErrorPage from './ErrorPage';
import { useLocation, Outlet } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

function App() {
  const location = useLocation();
  const savedPalettes = JSON.parse(localStorage.getItem('palettes'))
  const [state, setState] = useState({
    palette: savedPalettes || seedColors
  })

  useEffect(() => {
    const syncLocalStorage = () => {
      let palette = JSON.stringify(state.palette)
      localStorage.setItem('palettes', palette)
    }
    syncLocalStorage();
  }, [state])

  const AddPalette = (obj) => {
    setState(st => ({
      ...st, palette: [...st.palette, obj]
    }))

  }

  const deletePalette = (id) => {
    setState(st => ({ ...st, palette: st.palette.filter(item => item.id !== id) }))

  }

  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Routes>

            <Route path='/' element={<Home seedColors={generatePAlette(state.palette)} deletePalette={deletePalette} />} />
            <Route path='/palette/:paletteId' element={<SinglePalette seedColors={generatePAlette(state.palette)} />} />
            <Route path='/palette/:paletteId/:colorId' element={<Shades seedColors={generatePAlette(state.palette)} />} />
            <Route path='/palette/new' element={<NewPaletteForm addPalette={AddPalette} palettes={state.palette} />} />
            <Route path='*' element={<Home seedColors={generatePAlette(state.palette)} deletePalette={deletePalette} />} />





          </Routes>
        </CSSTransition>

      </TransitionGroup>


    </div>
  );
}

export default App;
