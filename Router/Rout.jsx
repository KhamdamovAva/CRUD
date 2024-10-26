import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../src/components/header/Header'
import CreateUser from '../src/components/CreateUs/CreateUser'
import ShowUser from '../src/components/showUser/ShowUser'
import Navbar from '../src/components/navbar/Navbar'

function Rout() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/CreateUser' element={<CreateUser />} />
        <Route path='/ShowUser' element={<ShowUser />} />
      </Routes>
    </Router>
  )
}

export default Rout
