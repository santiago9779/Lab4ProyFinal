import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Layout from "./paginas/Layout"
import Mesas from '/src/paginas/Mesas.jsx'
import Default from './paginas/Default'
import  Restaurante  from './paginas/Restaurante'
import { PersonalPage } from './paginas/PersonalPage'
import { LoginPage } from './paginas/LoginPage'
import { Ordenes } from './paginas/Ordenes'
import { Menu } from './paginas/Menu'
import { RequiredAuth } from './paginas/RequireAuth'

function App() {

  return (
    <div>
      <h1>Routes</h1>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path='/orden' element={
            <RequiredAuth>
              <Ordenes/>
            </RequiredAuth>}/>
            <Route path='/' element={<Restaurante/>}/>
            <Route path='/mesas' element={
            <RequiredAuth>
              <Mesas/>
            </RequiredAuth>}/>
            <Route path='/personal' element={
            <RequiredAuth>
              <PersonalPage/>
            </RequiredAuth>}/>
            <Route path="/menu" element={
            <RequiredAuth>
              <Menu/>
            </RequiredAuth>}/>
            <Route path='*' element={<Default/>}/>
          </Route>
        </Routes>
        
    </div>
  )
}

export default App
