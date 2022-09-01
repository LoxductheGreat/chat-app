import React from 'react'

function Register () {
  return (
    <div className='container d-flex justify-content-center'>
      <form className='registerForm-container border rounded'>
        <h1 className='d-flex justify-content-center'>Register</h1>
        <div className='p-1 m-3'>
          <label htmlFor='usernameInput' className='form-label'>Username</label>
          <input type='text' className='form-control' id='usernameInput' />
        </div>

        <div className='p-1 m-3'>
          <label htmlFor='passwordInput' className='form-label'>Password</label>
          <input type='password' className='form-control' id='passwordInput' />
        </div>

        <div className='d-flex justify-content-center'>
          <button type='button' className='btn btn-primary w-50'>
              Register
          </button>
        </div>
      </form>
    </div>
  )
}
export default Register
