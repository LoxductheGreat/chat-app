import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

function ProfileModel ({ user, children }) {
  return (
    <>
      {children ? (
        <span>{children}</span>
      ) : (
        <button type='button' className='btn btn-light notti-button d-flex ' data-bs-toggle='modal' data-bs-target='#ProfileModel'> <FontAwesomeIcon icon={faEye} /> </button>
      )}
      <div className='modal fade' id='ProfileModel' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticModelLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body text-center'>
              <h1>{user.username}</h1>
              <img className='profile-img rounded p-2' src={user.pic} alt='' />
              <h2 className='text-secondary'>{user.email}</h2>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileModel
