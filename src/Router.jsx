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
      <Route path="/ejin/" exact element={<Login />} />
      <Route path="/ejin/login/" element={<Login />} />
      <Route path="/ejin/register/" element={<Register />} />
      <Route path="/ejin/dashboard/" element={<Dashboard />} />
    </>
  )
)

export default router
