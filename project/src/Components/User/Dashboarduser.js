import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import instance from '../../Utils/axios'
function Dashboard() {
  const [data,setData]=useState([])
  useEffect(()=>{
    instance.get("/usercount")
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>{
      alert("No result found");
      console.log(err)
    })
  },[])
  return (
    <div className='container-fluid Dashboard'>
          <div className='row'>
            <div className='col-md-6 bg-black w-30'>
              <ul className='list-unstyled p-3'><br></br>
                <h4 className='text-center text-light'><b>DASHBOARD</b></h4><br></br>
                <li className="mb-3">
                  <Link to="/admin-viewnote" className="text-decoration-none text-light">
                    📄 VIEW MY NOTES
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/admin-viewuser" className="text-decoration-none text-light">
                     📄 VIEW NOTES
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/admin-addnote" className="text-decoration-none text-light">
                    ➕ ADD NOTES
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/validatenotes" className="text-decoration-none text-light">
                   📄 VIEW SAVED NOTES
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-md-6'>
              <div className="row mt-4 g-4 justify-content-center">
                <div className="col-md-5">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">Notes</h5>
                      <p>Total notes:{data}</p>
                      
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">Users</h5>
                      <p>No of users:</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <br></br>
        </div>
  )
}

export default Dashboard
