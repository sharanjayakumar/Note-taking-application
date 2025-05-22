import React from 'react'
import logo from '../../Assets/Notehublogo.JPG'
import profileIcon from '../../Assets/profile_icon.png'
import { Link } from 'react-router-dom'
function Nav() {
  
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img src={logo} alt="Logo" width="60px" height="60px" className="d-inline-block align-text-top" />
          </Link>
          <div className="d-flex ms-auto">
            <Link to="/viewprofile">
              <img src={profileIcon} alt="Profile" width="40" height="40" className="rounded-circle" />
            </Link>
            <Link to="/login">
                <svg className='bi bi-box-arrow-left mx-4' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                </svg>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav