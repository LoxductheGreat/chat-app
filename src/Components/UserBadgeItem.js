import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function UserBadgeItem ({ user, handleFunction }) {
  return (
    <div className='card badgeitem d-flex text-center bg-primary text-white p-1' onClick={handleFunction}>
      {user.username}
    </div>
  )
}

export default UserBadgeItem
