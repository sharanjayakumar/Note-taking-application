import React from 'react'

function Resetpass() {
  return (
    <div>
        <h3>RESET YOUR PASSWORD</h3>
        <form>
            <label htmlFor="user" className="form-label mx-2">Enter new password: </label>
              <input
                type="text"
                id="user"
                className="form-control w-75"
                placeholder="Enter a password you can remember"
                /><br/>
            <label htmlFor="user" className="form-label mx-3">Confirm password: </label>
              <input
                type="text"
                id="user"
                className="form-control w-75"
                placeholder="Enter the same password"
                />
        </form>
        
    </div>
  )
}

export default Resetpass