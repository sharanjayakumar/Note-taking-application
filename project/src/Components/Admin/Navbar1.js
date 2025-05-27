import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import logo from "../../Assets/Notehublogo.JPG"

function Navbar1({setSearchs}) {
    const inputRef=useRef()
      function handlesearch(e){
        e.preventDefault();
        setSearchs(inputRef.current.value)
      }
  return (
    <div>  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <img src={logo} height={"80px"} width={"80px"}></img>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item px-2">
          <Link  class="nav-link active" aria-current="page" to='/admin-dashboard' style={{textDecoration:"none",color:"black"}}>HOME</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            CATEGORIES
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to={'/category/c'} class="dropdown-item"  style={{textDecoration:"none"}}>C</Link></li>
            <li><Link to={'/category/java'} class="dropdown-item" >JAVA</Link></li>
            <li><Link to={"/category/python"}class="dropdown-item">PYTHON</Link></li>
            <li><Link to={'/category/html'} class="dropdown-item">HTML</Link></li>
            <li><Link to={'/category/css'}class="dropdown-item">CSS</Link></li>
            <li><Link to={'/category/javascript'} class="dropdown-item">JAVASCRIPT</Link></li>
             <li><Link to={'/admin-viewnote' } class="dropdown-item">ALL NOTES</Link></li>
          </ul>
        </li>
      </ul>

      <form class="d-flex">
        <input ref={inputRef} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handlesearch}></input>
        <button class="btn btn-primary" type="submit" onClick={handlesearch}>Search</button>
      </form>

    </div>
  </div>
</nav></div>
  )
}

export default Navbar1