import React from 'react'

function ChatItemList ({ user, handleFunction }) {
  return (
    <button type='button' className='btn btn-light d-flex w-100 cl-mb' onClick={handleFunction}>
      <img className='rounded-circle chatitemlistimg' src={user.pic} alt='' />
      <p className='m-1'><b>{user.username}</b></p>
      {/* <p>
        <b>Email: </b>
        {user.email}
      </p> */}
    </button>
  )
}

export default ChatItemList
