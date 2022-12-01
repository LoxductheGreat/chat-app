import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pic, setPic] = useState()
  const [picLoading, setPicLoading] = useState(false)

  const nav = useNavigate()

  const postPic = (pics) => {
    setPicLoading(true)
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'chat-app-okem')
      data.append('cloud_name', 'dynps2ons')
      fetch('https://api.cloudinary.com/v1_1/dynps2ons/image/upload', {
        method: 'post',
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString())
          setPicLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setPicLoading(false)
        })
    }
  }

  const onRegister = async (e) => {
    e.preventDefault()
    setPicLoading(true)
    setLoading(true)

    if (!username || !password || !email || !confirmPassword) {
      setErrorMessage('Please fill in the Fields')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords dont match')
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
        'https://chatting-app-api-chatify.herokuapp.com/api/user',
        { username, email, password, pic },
        config
      )

      setSuccessMessage('Login SuccessFul')

      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      setTimeout(() => nav('/login'), 2000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setLoading(false)
    }
    // setPicLoading(false)
    // setLoading(false)
    // nav('/login')
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
    <div className='vh-100 vw-100 rp-custom'>
      <div className='container d-flex justify-content-center'>
        <form className='border rounded bg-white justify-content-center p-2'>
          <h1 className='d-flex justify-content-center'>Register</h1>
          {successMessage ? <div className=' text-center alert alert-success alert-dismissible fade show' role='alert'>{successMessage}</div> : null}
          {errorMessage ? <div className='text-center alert alert-danger alert-dismissible fade show' role='alert'>{errorMessage}</div> : null}
          <div className='p-1 m-3'>
            <label htmlFor='usernameInput' className='form-label'>Username<b className='required-field'>*</b></label>
            <input type='text' className='form-control' id='usernameInput' value={username} onChange={e => setUsername(e.target.value)} />
          </div>

          <div className='p-1 m-3'>
            <label htmlFor='passwordInput' className='form-label'>Password<b className='required-field'>*</b></label>
            <input type='password' className='form-control' id='passwordInput' value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div className='p-1 m-3'>
            <label htmlFor='confirmpasswordInput' className='form-label'>Confirm Password<b className='required-field'>*</b></label>
            <input type='password' className='form-control' id='confirmpasswordInput' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>

          <div className='p-1 m-3'>
            <label htmlFor='emailInput' className='form-label'>Email<b className='required-field'>*</b></label>
            <input type='email' className='form-control' id='emailInput' value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className='p-1 m-3'>
            <label htmlFor='pic' className='form-label'>Upload your picture</label>
            <input type='file' accept='image/*' className='form-control' id='pic' onChange={e => postPic(e.target.files[0])} />
          </div>

          <div className='d-flex justify-content-center'>
            {loading ? <button className='btn btn-primary' type='button' disabled>
              <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
              <span> Loading...</span>
                       </button> : <button type='button' onClick={onRegister} className='btn btn-primary w-50'>Register</button>}

            {/* <button type='submit button' className='btn btn-primary w-50'>
              Register
            </button> */}
          </div>
        </form>
      </div>
    </div>

  )
}
export default Register
