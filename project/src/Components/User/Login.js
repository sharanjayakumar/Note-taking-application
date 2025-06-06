import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import img from '../../Assets/userlogologin.JPG';
import imgs from '../../Assets/login.jpg'
import axios from 'axios';
function Login() {
  const [user, setUserName] = useState('')
  const [pwd, setPassword] = useState('')
  const navigate = useNavigate()
  const validate = (e) => {
    e.preventDefault();
    if (user === '') {
      alert('Enter username')
    }
    else if (pwd === '') {
      alert('Enter password')
    }
    else {
      const userlogin = async () => {
        axios.post("http://localhost:3000/userlogin/verify", {
          username: user, password: pwd
        }).then((res) => {
          if (res.data) {
            navigate('/dashboard')
            localStorage.setItem("token", res.data.token)
          }


        })
          .catch((err) => {
            if (err.status == 400) {
              alert("Invalid credentials")
            }
            console.log(err)
          });
      }
      userlogin()

    }

  }
  return (
    <div>
      <div className="row w-100 align-items-center justify-content-center">
        <div className="col-lg-6 col-md-6 col-12 order-2 order-sm-1">
          <img src={imgs} alt="Login Visual" className="img-fluid" style={{ maxWidth: '100%', height: "100vh" }} />
        </div>
        <div className="col-lg-6 col-md-6 col-12 order-1 order-sm-2">
          <h1 className="text-center mb-4" style={{ fontFamily: 'Arial', fontStyle: 'italic', fontWeight: 'bold' }}>NOTEHUB</h1>
          <form className=" p-4 shadow rounded bg-white" onSubmit={validate}>
            <image src={img} /><h3 className="text-center mb-4">USER</h3>
            <center>
              <div className="mb-3">
                <label htmlFor="user" className="form-label mx-2">Username: </label>
                <input
                  type="text"
                  id="user"
                  className="form-control w-75"
                  value={user}
                  placeholder="Enter username"
                  onChange={(e) =>
                    setUserName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label mx-2">Password:</label>
                <input
                  onChange={(e) =>
                    setPassword(e.target.value)}
                  type="password"
                  id="pass"
                  className="form-control w-75"
                  placeholder="Enter password"
                  value={pwd}
                />
              </div>
            </center>
            <div className="d-grid">
              <button className="btn btn-primary w-25 mx-auto" type="submit">LOGIN</button>
            </div><br />
            <Link to='/forgot' style={{ marginLeft: "175px" }}>FORGOT PASSWORD</Link>
            <Link to='/create_account' className='mx-5'>CREATE NEW ACCOUNT?</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login