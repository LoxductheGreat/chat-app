import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import Loading from './Loading'
// import ChatLoading from './ChatLoading'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [successMessage, setSuccessMessage] = useState()

  const nav = useNavigate()

  const onLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!username || !password) {
      setErrorMessage('Please fill in the Fields')
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }

      const { data } = await axios.post(
        'https://chat-app-api-production-2f20.up.railway.app/api/user/login',
        { username, password },
        config
      )

      setSuccessMessage('Login SuccessFul')

      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      setTimeout(() => nav('/'), 2000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setLoading(false)
    }
    // setLoading(false)
    // nav('/')
  }

  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 5000)
  })

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo) {
      nav('/')
    }
  }, [nav])

  return (
    <div> {/* Wrapper */}
      {/* Login Form */}
      <div className='vh-100 vw-100 mt-custom'>
        <div className='container d-flex justify-content-center'>
          <form className='border rounded bg-white justify-content-center p-4'>
            <h1 className='d-flex justify-content-center'>Login</h1>
            {successMessage ? <div className='alert alert-success alert-dismissible fade show' role='alert'>{successMessage}</div> : null}
            {/* {successMessage ? <div className='toast align-items-center' role='alert' aria-live='assertive' aria-atomic='true'>
              <div className='d-flex'>
                <div className='toast-body'>
                  {successMessage}
                </div>
                <button type='button' className='btn-close me-2 m-auto' data-bs-dismiss='toast' aria-label='Close' />
              </div>
            </div> : null} */}
            {errorMessage ? <div className='alert alert-danger alert-dismissible fade show' role='alert'>{errorMessage}</div> : null}
            <div className='p-1 m-3'>
              <label htmlFor='username' className='form-label'>Username</label>
              <input type='text' className='form-control' name='username' value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className='p-1 m-3'>
              <label htmlFor='password' className='form-label'>Password</label>
              <input type='password' className='form-control' name='password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className='d-flex justify-content-center'>
              {isLoading ? <button className='btn btn-primary' type='button' disabled>
                <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                <span> Loading...</span>
              </button>
                : <button type='button' onClick={onLogin} className='btn btn-primary w-50'>Login</button>}

              {/* <button type='button' onClick={onLogin} className='btn btn-primary w-50'>
                Login
              </button> */}
            </div>
            <p className='d-flex justify-content-center m-3'>Dont have an account? <Link className='ps-1' to='/register'>Register!</Link></p>
            <p className='d-flex justify-content-center m-3' onClick={() => { setUsername('guestuser'); setPassword('guest123') }}>Login as Guest instead</p>
          </form>
        </div>
      </div>
    </div>

  )
}
export default Login
