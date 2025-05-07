import React from 'react'

function Forgotpass() {
  return (
    <div>
      <form className='form-control d-flex my-5 border-0'>
        <label className='mx-auto'>Enter your mail id or phone number to reset your password </label>
        <input className='w-25 mx-auto' placeholder='You will recieve a message shortly'/>
        <button className='mx-auto' style={{backgroundColor:'blue',color:'white', width:'200px',height:'35px'}} variant="primary" type="submit">Send reset password link</button>
      </form>
    </div>
  )
}

export default Forgotpass