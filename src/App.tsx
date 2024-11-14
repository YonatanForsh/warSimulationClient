import React, { useEffect } from 'react'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ControlDefence from './components/pages/ControlDefence'
import ControlAttack from './components/pages/ControlAttack'
import Nav from './components/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function App() {
  const dispath = useDispatch()

  // useEffect({
  //   dispath()

  // }, [])

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="controlAttack" element={<ControlAttack />} />
        <Route path="controldefence" element={<ControlDefence />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  )
}
