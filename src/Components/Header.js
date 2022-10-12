import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <div className='header'>
      <div className='icon'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input placeholder='Search User' />
      <p>Chatify</p>
      <button className='noti-bttn'>
        <FontAwesomeIcon icon={faBell} />
      </button>
    </div>
  )
}

export default Header