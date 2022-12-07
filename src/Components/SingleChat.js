import React, { useState } from 'react'
import { ChatState } from '../Context/ChatContext'
import { getSender, getSenderFull } from './ChatLogic'
import ProfileModel from './ProfileModel'
import UpdatedGroupChatModel from './UpdatedGroupChatModel'
import LoadSingleChat from './LoadSingleChat'

export default function SingleChat ({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState()



  const { user, selectedChat, setSelectedChat } = ChatState()

  return <>{
    selectedChat ? (
      <><div className=' fs-4 p-2 d-flex align-items-center justify-content-between '>
        {!selectedChat.isGroupChat ? (
          <>
            {getSender(user, selectedChat.users)}
            <ProfileModel user={getSenderFull(user, selectedChat.users)} />
          </>
        ) : (
          <>{selectedChat.chatName.toUpperCase()}
          <UpdatedGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </>
        )}
        </div>
        <div className='messagebox d-flex justify-content-end m-2 overflow-hidden rounded'>
          {!loading ? (
            <LoadSingleChat />
          ) : (
            <></>
          )}
        </div>
      </>
    ) : (
      <div className='card d-flex align-items-center justify-content-center h-100 fs-2'>
        <div>
                Click on a user to start chatting
        </div>
      </div>
    )
  }
  </>
}
