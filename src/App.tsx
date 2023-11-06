import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import DetailMovie from './pages/Movies/DetailMovie';
import NotFoundPage from './pages/NotFoundPage';
import SearchMovie from './pages/Movies/SearchMovie';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/detail-movie/:id' element={<DetailMovie />} />
        <Route path='/search' element={<SearchMovie />} />
        <Route path='*' index element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
