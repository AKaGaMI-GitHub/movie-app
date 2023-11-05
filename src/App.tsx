import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import DetailMovie from './pages/Movies/DetailMovie';
import NotFoundPage from './pages/NotFoundPage';
import { useState } from 'react';

function App() {
  const [darkTheme, setisDark] = useState<Boolean>(false)
  
  function darkMode(condition:boolean)
  {
    document.documentElement.classList.toggle("dark")
    setisDark(condition)
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/detail-movie/:id' element={<DetailMovie />} />
        <Route path='*' index element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
