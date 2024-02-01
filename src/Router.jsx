import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import Login from './component/Login'
import Register from './component/Register'
import Dashboard from './component/Dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" exact element={<Login />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
      <Route path="/dashboard/" element={<Dashboard />} />
    </>
  )
)

export default router
