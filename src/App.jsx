import React from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Menu from './pages/Menu/Menu'
import Moeda from './pages/Moedas/Moeda'


function App(){
  return (
    <>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/moeda/:moedaId" element={<Moeda />} />
          </Routes>
        </div>
        
    </>

  )
}

export default App