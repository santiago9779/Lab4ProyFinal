import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import {Layout} from "/src/paginas/Layout.jsx"
import {Mesas} from './paginas/Mesas.jsx'
import Default from './paginas/Default'
import  {Restaurante}  from './paginas/Restaurante.jsx'
import { PersonalPage } from './paginas/PersonalPage'
import { LoginPage } from './paginas/LoginPage'
import { Ordenes } from './paginas/Ordenes'
import { Menu } from './paginas/Menu'
import { RequiredAuth } from './paginas/RequireAuth'
import { AdminOrdenes } from './paginas/Adminordenes.jsx'
import { AdminMenu } from './paginas/AdminMenu.jsx'
import { AdminMesas } from './paginas/AdminMesas.jsx'


function App() {

  return (
    <div id='contenedor'>
      <h1>Routes</h1>
        <Routes>
          <Route path='/' element={<Layout/>}>
            
            <Route path="/login" element={<LoginPage/>}/>
            
            <Route path='/orden' element={
              <RequiredAuth>
                <AdminOrdenes/>
              </RequiredAuth>}/>
            
              <Route path='/' element={
              <RequiredAuth>
                <Restaurante/>
              </RequiredAuth>}/>
            
            <Route path='/mesas' element={
              <RequiredAuth>
                <AdminMesas/>
              </RequiredAuth>}/>
            
            <Route path='/personal' element={
              <RequiredAuth>
                <PersonalPage/>
              </RequiredAuth>}/>

            <Route path="/menu" element={
              <RequiredAuth>
                <AdminMenu/>
              </RequiredAuth>}/>

            <Route path='*' element={<Default/>}/>
          </Route>
        </Routes>
        
    </div>
  )
}

export default App
