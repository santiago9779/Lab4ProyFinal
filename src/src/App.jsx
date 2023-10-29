import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Layout from "./paginas/layout"
import Ordenes from './paginas/ordenes'
import Mesas from './paginas/mesas'
import Default from './paginas/default'
import Restaurante from './paginas/restaurante'


function App() {

  return (
    <div>
      <h1>Routes</h1>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/ordenes' element={<Ordenes/>}/>
            <Route path='/' element={<Restaurante/>}/>
            <Route path='/mesas' element={<Mesas/>}/>
            <Route path='*' element={<Default/>}/>
          </Route>
        </Routes>
        
    </div>
  )
}

export default App
