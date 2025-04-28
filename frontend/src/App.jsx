import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BubbleSort from './pages/BubbleSort'
import SelectionSort from './pages/SelectionSort'
import InsertionSort from './pages/InsertionSort'


function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sorting/bubblesort' element={<BubbleSort />} />
        <Route path='/sorting/selectionsort' element={<SelectionSort />} />
        <Route path='/sorting/insertionsort' element={<InsertionSort />} />
        {/* <Route path='/speed' element={<SpeedBar/>} /> */}
      </Routes>
    </div>
  )
}

export default App
