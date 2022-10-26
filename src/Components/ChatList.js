import React, { useEffect, useState } from 'react'
import { userChats } from './api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function ChatList () {
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    userChats().then(x => {
      setChatList(x)
      console.log(x)
    })
  }, [])

  return (
    <div>
      <div className='card m-2 chatlist'>
        <div>
          <div className='cl-header d-flex card-body row'>
            <h4 className='card-title col'>My Chats</h4>
            <button type='button' className='btn btn-primary col newgroupchat'>New Group Chat<FontAwesomeIcon icon={faPlus} /></button>
          </div>
        </div>
        <div className='col d-flex card-body flex-column'>{chatList.map((chats, idx) => (
          <button type='button' className='btn btn-light button' key={chats._id}>
            {chats.chatName}
          </button>
        ))}
        </div>
      </div>
    </div>
  )
}

export default ChatList
