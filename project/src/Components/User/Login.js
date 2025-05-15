import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import img from '../../Assets/userlogologin.JPG';
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
    else{
      const userlogin = async()=>{
        axios.post("http://localhost:3000/userlogin/verify",{
          username:user,password:pwd
        }).then((res)=>{
          if(res.data)
          {
            navigate('/dashboard')
            localStorage.setItem("token",res.data.token)
          }
          
          
        })
        .catch((err)=>{
          if(err.status == 400)
          {
            alert("Invalid credentials")
          }
          console.log(err)
        });
      }
    userlogin()

    }
    
  }
  return (
    <div className='l'>
      <form style={{ marginLeft: '100px' }} className='form_login my-5' onSubmit={validate}>
        <h3>USER</h3><br />
        <div className="row mb-3 align-items-center">
          <label htmlFor="user" className="col-3 col-form-label">Username:-</label>
          <div className="col-8">
            <input
              type="text"
              id="user"
              className="form-control"
              value={user}
              placeholder="Enter username"
              onChange={(e) =>
                setUserName(e.target.value)
              }
            />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label htmlFor="pass" className="col-3 col-form-label">Password :-</label>
          <div className="col-8">
            <input
            onChange={(e)=>
              setPassword(e.target.value)}
              type="password"
              id="pass"
              className="form-control"
              placeholder="Enter password"
              value={pwd}
            />
          </div>
        </div>
        <center>
    
          <button  className="butn" type="submit">
            LOGIN
          </button>
          
        </center>
        <div className='row'>
          <Link to='/Forgotpassword' className='col-6'>FORGOT PASSWORD</Link>
          <Link to='/create_account' className='col-6'>CREATE NEW ACCOUNT?</Link>
        </div>

      </form>
    </div>
  )
}

export default Login
