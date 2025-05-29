import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'

function Resetpass() {
  const [pass,setPass]=useState("");
  const [cpass,setCpass]=useState("");
    const handleReset=async(e)=>{
      e.preventDefault();
      const token=localStorage.getItem("token")
      try{
         if(pass!=cpass)
    {
      alert("Passwords do not match");

    }
    else{
      axios.post("http://localhost/resetpass",{password:pass},
        {headers:{Authorization:`Bearer ${token}`}}
      )
      alert("Password updated successfully")
    }
      }
    catch(err)
    {
      alert("Unable to update password");
    }
    }
  return (
    <div>
      <br></br>
        <h3 className='text-center'>RESET YOUR PASSWORD</h3><br></br>
        <center><form onSubmit={handleReset} class="container">
           <div>
            <label htmlFor="user" className="form-label text-center">Enter new password: </label>
              <input
                type="password"
                id="user"
                className="form-control w-25"
                placeholder="Enter a password you can remember"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                /><br/>
           </div>
            <label htmlFor="user" className="form-label">Confirm password: </label>
              <input
                type="password"
                id="user"
                className="form-control w-25"
                placeholder="Enter the same password"
                value={cpass}
                onChange={(e) => setCpass(e.target.value)}
                />
                <br></br>
                 <button type="submit" className="btn btn-primary">RESET PASSWORD</button>
                <Link class="btn btn-primary" to={"/login"} style={{marginLeft:"20px"}}>BACK</Link>
        </form></center>
        
    </div>
  )
}

export default Resetpass