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
            <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
          </Link>
          <div className="d-flex ms-auto">
            <Link to="/viewprofile">
              <img src={profileIcon} alt="Profile" width="40" height="40" className="rounded-circle" />
            </Link>
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav