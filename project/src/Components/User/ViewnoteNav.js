import React from 'react'
import logo from '../../Assets/Notehublogo.JPG'
import profileIcon from '../../Assets/profile_icon.png'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
function ViewnoteNav({setSearch}) {
  const inputRef=useRef()
    function handlesearch(e){
      e.preventDefault();
      setSearch(inputRef.current.value)
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <img src={logo} alt="Logo" width="60" height="60" className="d-inline-block align-text-top" />
          <li class="nav-item px-2" style={{listStyleType:"none"}}>
                    <Link  class="nav-link active" aria-current="page" to='/dashboard' style={{textDecoration:"none",color:"black"}}>HOME</Link>
                  </li>
          <li style={{listStyle:"none"}} class="nav-item dropdown mx-4">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              CATEGORIES
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link to={'/category/c'} class="dropdown-item" style={{ textDecoration: "none" }}>C</Link></li>
              <li><Link to={'/category/java'} class="dropdown-item" >JAVA</Link></li>
              <li><Link to={"/category/python"} class="dropdown-item">PYTHON</Link></li>
              <li><Link to={'/category/html'} class="dropdown-item">HTML</Link></li>
              <li><Link to={'/category/css'} class="dropdown-item">CSS</Link></li>
              <li><Link to={'/category/javascript'} class="dropdown-item">JAVASCRIPT</Link></li>
            </ul>
          </li>

          <form class="d-flex">
            <input ref={inputRef} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" ></input>
            <button class="btn btn-primary" type="submit" onClick={handlesearch}>Search</button>
          </form>

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

export default ViewnoteNav