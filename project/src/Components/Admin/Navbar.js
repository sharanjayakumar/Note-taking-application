import React from 'react'

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">LOGO</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item px-2">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 CATEGORIES
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li class="cat"><a class="dropdown-item" href="#">C</a></li>
                  <li class="cat"><a class="dropdown-item" href="#">JAVA</a></li>
                  <li class="cat"><a class="dropdown-item" href="#">PYTHON</a></li>
                  <li class="cat"><a class="dropdown-item" href="#">HTML</a></li>
                  <li class="cat"><a class="dropdown-item" href="#">CSS</a></li>
                  <li class="cat"><a class="dropdown-item" href="#">JAVASCRIPT</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button class="btn btn-primary" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar