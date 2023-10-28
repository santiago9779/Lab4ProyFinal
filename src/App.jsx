import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Layout from "./paginas/layout"
import About from './paginas/about'
import Home from './paginas/home'
import Dashboard from './paginas/dashboard'
import Default from './paginas/default'


function App() {

  return (
    <div>
      <h1>Routes</h1>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='about' element={<About/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='*' element={<Default/>}/>

          </Route>
        </Routes>
        
    </div>
  )
}

export default App
