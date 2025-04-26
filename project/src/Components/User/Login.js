import React from 'react';
import img from '../../Assets/userlogologin.JPG';
import Link from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import
function Login() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
    </Routes>
    <div className='l'>
        <img src={img} className='ll' alt='User Login Logo'></img>
        <br/>
        <form>
            <label>USERNAME </label>
            <input style={{marginLeft:'50px'}} type="text" name="id" />
            <br/><br/>
            <label>PASSWORD </label>
            <input style={{marginLeft:'50px'}} type="password" name="password" />
            <br/><br/>
            <button className='lib' type="submit">LOGIN</button>
            <br/>
            <button className='lfb' onClick={<Link to = '/Forgotpassword'></Link>}>FORGOT PASSWORD</button>
            <a href='#' className='lb'>CREATE NEW ACCOUNT?</a>
        </form>
    </div>
    </BrowserRouter>
  )
}

export default Login
