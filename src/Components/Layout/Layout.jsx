import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout({ logout, UserData }) {


 


  return <>
  
  
    <Navbar logout={logout} UserData={UserData} />









    <div className="container-fluid my-5">
      <div className='p-5'>

    <Outlet></Outlet>
      </div>
    </div>
    
    <footer className='text-center p-5 bg-gradient fa-2x '>
      <p>&copy; Ahmed Elsnosy</p>
    </footer>
    
  
  
  </>
}
