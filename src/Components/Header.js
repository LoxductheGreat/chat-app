import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { ChatState } from '../Context/ChatContext'
import ChatLoading from '../Animations/ChatLoading'
import axios from 'axios'
import ChatItemList from './ChatItemList'
import Spinner from '../Animations/Spinner'
import { getSender } from './ChatLogic'
import NotificationBadge from 'react-notification-badge'
import { Effect } from 'react-notification-badge'

function Header () {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingchat, setLoadingChat] = useState(false)

  const { user, chats, setChats, setSelectedChat, notification, setNotification } = ChatState()

  const nav = useNavigate()

  const onLogout = () => {
    localStorage.removeItem('userInfo')
    nav('/login')
    window.location.reload()
  }

  const onSearch = async () => {
    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`https://chat-app-api-g58w.onrender.com/api/user?search=${search}`, config)
      setLoading(false)
      setSearchResult(data)
      console.log(data)
    } catch (error) {
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post('https://chat-app-api-g58w.onrender.com/api/chat', { userId }, config)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
      setSelectedChat(data)
      setLoadingChat(false)
    } catch (error) {

    }
  }

  return (
    <nav className='d-flex justify-content-between align-items-center bg-white w-100 border border-3'>
      <button className='d-line btn btn-light ' type='button' data-bs-toggle='offcanvas' data-bs-target='#staticBackdrop' aria-controls='staticBackdrop'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='align-baseline my-2 my-sm-0 px-1' size='sm' /> Search User
      </button>
      <div className='offcanvas offcanvas-start w-auto' data-bs-backdrop='static' tabIndex='-1' id='staticBackdrop' aria-labelledby='staticBackdropLabel'>
        <div className='offcanvas-header'>
          <h4 className='offcanvas-title x' id='staticBackdropLabel'>Search Users</h4>
          <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close' />
        </div>
        <div className='offcanvas-body'>
          <div className='input-group mb-3'>
            <input type='text' className='form-control' placeholder='Search by name or email' aria-describedby='button-addon1' value={search} onChange={e => setSearch(e.target.value)} />
            <button className='btn btn-primary' type='button' id='button-addon1' onClick={onSearch}>Search</button>
          </div>
          {loading ? (<ChatLoading />) : (
            searchResult?.map(user => (
              <ChatItemList key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
            ))
          )}
          {loadingchat && <Spinner />}
        </div>
      </div>
      <h4 className='m-1 my-sm-0'>Chatify</h4>
      <div className='btn-group-sm mx-4' role='group' aria-label='Button group with nested dropdown'>
        {/* Might wanna use a badge for notiication bell */}
        <button type='button' className='btn btn-light notti-button dropdown-toggle' data-bs-toggle='dropdown'><NotificationBadge count={notification.length} effect={Effect.SCALE} /><FontAwesomeIcon size='xl' icon={faBell} />
        </button>

        {/* DropDown */}
        <ul className='dropdown-menu'>
          {!notification.length && 'No New Messages'}
          {notification.map((noti) => (
            <p
              className='dropdown-item' key={noti._id} onClick={() => {
                setSelectedChat(noti.chat)
                setNotification(notification.filter((n) => n !== noti))
              }}
            >
              {noti.chat.isGroupChat ? `New Message in ${noti.chat.chatName}` : `New Message from ${getSender(user, noti.chat.users)}`}
            </p>
          ))}
        </ul>

        <button type='button' className='btn btn-light '><img className='rounded header-img' src={user.pic} alt='' /></button>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false' />
          <ul className='dropdown-menu dropdown-menu-end'>
            <li><button type='button' className='dropdown-item' data-bs-toggle='modal' data-bs-target='#staticModel'>My Profile</button></li>
            <li><button className='dropdown-item' onClick={onLogout}>Logout</button></li>
          </ul>
        </div>
      </div>

      {/* Profile Model */}
      <div className='modal fade' id='staticModel' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticModelLabel' aria-hidden='true'>
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
    </nav>
  )
}

export default Header
