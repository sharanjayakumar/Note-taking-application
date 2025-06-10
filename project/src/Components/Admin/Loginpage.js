import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import image from '../../Assets/login.jpg'
import instance from '../../Utils/axios';


function Loginpage() {
  const [user, setAdmin] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const login = async () => {
    instance.post("/admin-login", {
      username: user,
      password: pass
    }).then((res) => {
      if (res.data) {
        console.log(res.data)
        navigate('/admin-dashboard')
        localStorage.setItem("token", res.data)
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }
  const validate = (e) => {
    e.preventDefault();

    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    if (user === '') {
      alert('Enter username');
    } else if (pass === '') {
      alert('Enter password');
    } else if (user === adminUsername && pass === adminPassword) {
      login()
    } else {
      alert('Invalid credentials');
    }
  };

  return (
   <div>
  <div className="row w-100 align-items-center justify-content-center">
    <div className="col-lg-6 col-md-6 col-12 order-2 order-sm-1">
      <img src={image} alt="Login Visual" className="img-fluid" style={{ maxWidth: '100%',height:"100vh" }} />
    </div>
    <div className="col-lg-6 col-md-6 col-12 order-1 order-sm-2 form-login">
    <h1 className="text-center mb-4" style={{ fontFamily: 'Arial', fontStyle: 'italic', fontWeight: 'bold' }}>NOTEHUB</h1>
      <form className=" p-4 shadow rounded bg-white" onSubmit={validate}>
        <h3 className="text-center mb-4">ADMIN</h3>
        <center>
          <div className="mb-3">
          <label htmlFor="user" className="form-label mx-2">Username: </label>
          <input
            type="text"
            id="user"
            className="form-control"
            value={user}
            onChange={(e) => setAdmin(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">Password:</label>
          <input
            type="password"
            id="pass"
            className="form-control"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        </center>
        <div className="d-grid">
          <button className="btn btn-primary w-25 mx-auto" type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}
export default Loginpage;
