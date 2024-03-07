import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'


function Layout() {
  return (
    <div className='h-screen'>
        <Navbar />
        <Outlet  />
        <Footer />
    </div>
  )
}

export default Layout