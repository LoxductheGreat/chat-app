import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons'

function Header () {
  return (
  // <div className='h-container'>
  //   <div className='navbar'>
  //     <div className='searchbox-container'>
  //       <input className='search' placeholder='Search User' />
  //       <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' size='lg' />
  //     </div>
  //     <h2 className='title'>Chatify</h2>
  //     <nav>
  //       <ul>
  //         <li><button className='notti-button'><FontAwesomeIcon size='xl' icon={faBell} /></button></li>
  //       </ul>
  //     </nav>
  //   </div>
  // </div>
    <div>
      <nav className='navbar navbar-light bg-light'>
        <form className='form-inline searchbar'>
          <input className='form-control mr-sm-2' type='search' placeholder='Search User' aria-label='Search' />
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon my-2 my-sm-0' size='lg' /> */}
        </form>
        <h3 className='navbar-brand m-1 my-sm-0 title'>Chatify</h3>
        <button className='notti-button'><FontAwesomeIcon size='xl' icon={faBell} /></button>
      </nav>
    </div>

  )
}

export default Header
