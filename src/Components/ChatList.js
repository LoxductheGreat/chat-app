import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ChatState } from '../Context/ChatContext'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import { getSender } from './ChatLogic'

function ChatList () {
  const [loggedUser, setLoggedUser] = useState()
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get('https://chatting-app-api-chatify.herokuapp.com/api/chat', config)
      setChats(data)
    } catch (error) {

    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
    fetchChats()
  }, [])

  return (
    <div className='card col m-2 col-4 mychatcard'>
      <div className='card-header d-flex justify-content-between'>
        <h2 className='card-title'>My Chats</h2>
        <button type='button' className='btn btn-primary float-right' data-bs-toggle='modal' data-bs-target='#newgroupBackdrop'>New Group Chat<FontAwesomeIcon icon={faPlus} /></button>
      </div>

      {/* <------------ Model --------------> */}
      <div class='modal fade' id='newgroupBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5' id='staticBackdropLabel'><b className='newgrouptitle'>Create Group Chat</b></h1>
              <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div class='modal-body'>
              <input className='d-flex' placeholder='Chat name' />
              <input placeholder='Add Users ex: guestuser' />
            </div>
            <div class='modal-footer'>
              <button type='button' class='btn btn-primary' data-bs-dismiss='modal'>Create Chat</button>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body'>
        {chats ? (
          <div className='h-auto'>
            {chats.map((chat) => (
              <button type='button' className='m-2 w-100 d-flex btn btn-light' onClick={() => setSelectedChat(chat)} key={chat._id}>
                <p>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : (chat.chatName)}</p>
              </button>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  )
}

export default ChatList
