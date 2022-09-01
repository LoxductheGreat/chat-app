import React from 'react'
import { Link } from 'react-router-dom'

function Login () {
  return (
    <div className='container d-flex justify-content-center'>
      <form className='loginForm-container border rounded'>
        <h1 className='d-flex justify-content-center'>Login</h1>
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
                Login
          </button>
        </div>
        <p className='d-flex justify-content-center m-3'>Dont have an account? <Link className='ps-1' to='/register'>Register!</Link></p>
      </form>
    </div>
  )
}
export default Login
