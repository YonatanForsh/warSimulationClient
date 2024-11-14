import React from 'react'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ControlDefence from './components/pages/ControlDefence'
import ControlAttack from './components/pages/ControlAttack'
import Nav from './components/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function App() {

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="controlAttack" element={<ControlAttack />} />
        <Route path="controldefence" element={<ControlDefence />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
      </Routes>    </div>
  )
}
