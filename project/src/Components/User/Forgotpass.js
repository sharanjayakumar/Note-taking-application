import React from 'react'
import woman_thinking from '../../Assets/woman_thinking_forgotpass.jpg';
import man_thinking from '../../Assets/man_thinking_forgotpass.JPG';
function Forgotpass() {
  return (
    <div className='d-flex'>
      <img src={woman_thinking} className='w-25 h-25'/>
      <form className='form-control my-5 border-0 d-flex flex-column justify-content-center mx-auto w-auto'>
        <label className='mx-auto'>Enter your mail id or phone number to reset your password </label><br/>
        <input className='w-75 mx-auto' placeholder='You will recieve a message shortly'/><br/>
        <button className='mx-auto' style={{backgroundColor:'blue',color:'white', width:'200px',height:'35px'}} variant="primary" type="submit">Send reset password link</button>
      </form>
      <img src={man_thinking} className='w-25 h-25'/>
    </div>
  )
}

export default Forgotpass