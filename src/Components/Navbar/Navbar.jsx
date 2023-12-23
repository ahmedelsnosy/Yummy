import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Images/0d289fd2752c931dda641e54203f39857aec93493a03db394c9c6510c618b30b.jpg'
import Style from './Navbar.module.css'
export default function Navbar({ UserData, logout }) {
  
  
  
  
  
return <>
  
  <nav className={`${Style.navigation} navbar navbar-expand-lg  fixed-top shadow-lg` }>
  <div className="container-fluid">
    <Link className="navbar-brand ms-3" to=""><img src={Logo} width={100} alt="logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
          {UserData ?  <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
            
             <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="">Home</Link>
          </li>
      
          <li className="nav-item">
            <Link className="nav-link" to="categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="area">Area</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="ingredients">Ingredients</Link>
          </li>
         
         </ul> 
          
       : ""}


<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {UserData?
        <>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout} >Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="profile">{`${UserData.first_name} ${UserData.last_name}`}</Link>
                                </li>
                               
                            </>:
            
            <>
          <li className="nav-item d-flex justify-content-center align-items-center fa-1x">
            <i className='fab fa-facebook text-white mx-2'></i>
            <i className='fab fa-twitter text-white mx-2'></i>
            <i className='fab fa-tiktok text-white mx-2'></i>
            <i className='fab fa-youtube text-white mx-2'></i>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
          </li>
        
          
          </>}
        </ul>
 
         
      
      
      
    </div>
  </div>
</nav>

  
  </>
}
