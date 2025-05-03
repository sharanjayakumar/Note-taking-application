import React from 'react';
import img from '../../Assets/userlogologin.JPG';
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function Login() {
  return (
   
    <div className='l'>
      <form style={{marginLeft:'100px'}} className='form_login my-5'>
        <h3>USER</h3><br />
        <div className="row mb-3 align-items-center">
          <label htmlFor="user" className="col-3 col-form-label">Username:-</label>
          <div className="col-8">
            <input
              type="text"
              id="user"
              className="form-control"
              
              placeholder="Enter username"
            />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label htmlFor="pass" className="col-3 col-form-label">Password :-</label>
          <div className="col-8">
            <input
              type="password"
              id="pass"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
        </div>
        <center>
          <button className="butn" type="submit">LOGIN</button>
        </center>
        <div className='row'>
          <Link to='/forgot' className=' col-6'>FORGOT PASSWORD</Link>
          <Link to='/create_account' className=' col-6'>CREATE NEW ACCOUNT?</Link>
        </div>
        
      </form>
    </div>
  )
}

export default Login
