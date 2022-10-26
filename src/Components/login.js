import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from './api'
import { LoginContext, LoginProvider, useLogin } from '../Context/LoginContext'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  // const { token, setToken } = useLogin()
  const [token, setToken] = useState('')

  const nav = useNavigate()

  function onLogin (e) {
    e.preventDefault()
    setLoading(true)

    userLogin(username, password)
      .then(token => {
        localStorage.setItem('token ', token)
      })
    setLoading(false)
    nav('/')
  }


  return (
    <div className='container d-flex justify-content-center'>
      <form onSubmit={onLogin} className='loginForm-container border rounded'>
        <h1 className='d-flex justify-content-center'>Login</h1>
        <div className='p-1 m-3'>
          <label htmlFor='username' className='form-label'>Username</label>
          <input type='text' className='form-control' name='username' value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className='p-1 m-3'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' className='form-control' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-primary w-50'>
                Login
          </button>
        </div>
        <p className='d-flex justify-content-center m-3'>Dont have an account? <Link className='ps-1' to='/register'>Register!</Link></p>
      </form>
    </div>
  )
}
export default Login
