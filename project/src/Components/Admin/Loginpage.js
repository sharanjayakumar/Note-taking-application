import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Loginpage() {
  const [user, setAdmin] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const login= async()=>{
    axios.post("http://localhost:3000/admin-login",{
      username:user,
      password:pass
    }).then((res)=>{
      if(res.data)
      {
        navigate('/admin-dashboard')
      }
    })
    .catch((err)=>{
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
      navigate('/admin-dashboard'); 
    } else {
      alert('Invalid credentials');
    }   

    login()
  };

  return (
    <div className='Login'>
      <form className='form_login' onSubmit={validate}>
        <h3>ADMIN</h3><br />
        <div className="row mb-3 align-items-center">
          <label htmlFor="user" className="col-3 col-form-label">Username:-</label>
          <div className="col-8">
            <input
              type="text"
              id="user"
              className="form-control"
              value={user}
              onChange={(e) => setAdmin(e.target.value)}
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
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>
        <center>
          <button className="butn" type="submit">LOGIN</button>
        </center>
      </form>
    </div>
  );
}
export default Loginpage;
