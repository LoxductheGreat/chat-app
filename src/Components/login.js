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
        'https://chatting-app-api-chatify.herokuapp.com/api/user/login/',
        { username, password },
        config
      )
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      console.log(error.response.data.message)
    }
    setLoading(false)
    nav('/')
  }

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
          <form onSubmit={onLogin} className='border rounded bg-white justify-content-center p-4'>
            <h1 className='d-flex justify-content-center'>Login</h1>
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
              <button type='submit button' className='btn btn-primary w-50'>
                Login
              </button>
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
