import React from 'react'
import { Link } from 'react-router-dom'
function Createacc() {
  return (
    <div>
        <form className='my-3 mx-auto' style={{border:'solid',width:'700px'}}>
    <center>
      <form className="mb-3" controlId="formBasicEmail">
      <label>ID/NAME</label>
      <center>
      <input style={{width:'300px'}} type="text" placeholder="Enter name or id" />
      </center>
      
        <label>Email address</label>
        <center>
        <input style={{width:'300px'}} type="email" placeholder="Enter email" />
        </center>
        
        <label className="text-muted">
          We'll never share your email with anyone else.
        </label>
      </form>

      <form className="mb-3" controlId="formBasicPassword">
        <label>Password</label>
        <center>
        <input style={{width:'300px'}} type="password" placeholder="Password" />
        </center> 
      </form>
      <form className="mb-3" controlId="formBasicPassword">
        <label>Confirm Password</label>
        <center>
        <input style={{width:'300px'}} type="password" placeholder="Password once more" />
        </center>
      </form>
      <form className="mb-3" controlId="formBasicNumber">
        <label>Phone Number</label>
        <center>
        <input style={{width:'300px'}} type="number" placeholder="Your 10 digit number" /><br/>
        </center>
        </form>
      <form>
        <label className='mb-3'>Course</label>
        <center><input style={{width:'300px'}} type='text' placeholder='Enter the course you are studying'/></center>
      </form>
        
    <br/><br/>
      <button  style={{backgroundColor:'blue',color:'white'}} variant="primary" type="submit">
        <Link to='/login'></Link>
        Create account
      </button><br/><br/>
      </center>
    </form>
    
    </div>
  )
}

export default Createacc