import React from 'react'
import logo from '../../Assets/Notehublogo.JPG'
function Createnav() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid"> 
            <img src={logo} alt="Logo" width="60" height="60" className="d-inline-block align-text-top" />   
        </div>
      </nav>
    </div>
  )
}

export default Createnav