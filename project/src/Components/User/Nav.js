import React from 'react'
import logo from '../../Assets/Notehublogo.JPG'
import profileIcon from '../../Assets/profile_icon.png'
function Nav() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
          </a>
          <div className="d-flex ms-auto">
            <img src={profileIcon} alt="Profile" width="40" height="40" className="rounded-circle" />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav