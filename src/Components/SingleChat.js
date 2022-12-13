import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatContext'
import { getSender, getSenderFull } from './ChatLogic'
import ProfileModel from './ProfileModel'
import UpdatedGroupChatModel from './UpdatedGroupChatModel'
// import LoadSingleChat from './LoadSingleChat'
import Spinner from '../Animations/Spinner'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'

export default function SingleChat ({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState()

  const { user, selectedChat, setSelectedChat } = ChatState()

  const fetchMessages = async () => {
    if (!selectedChat) return

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      setLoading(true)

      const { data } = await axios.get(`https://chat-app-api-production-2f20.up.railway.app/api/message/${selectedChat._id}`, config)

      setMessages(data)
      setLoading(false)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchMessages()
  }, [selectedChat])

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }

        setNewMessage('')
        const { data } = await axios.post('https://chat-app-api-production-2f20.up.railway.app/api/message',
          {
            content: newMessage,
            chatId: selectedChat._id
          }, config)

        console.log(data)
        setMessages([...messages, data])
      } catch (error) {

      }
    }
  }

  const onTyping = (e) => {
    setNewMessage(e.target.value)
  }

  return (
    <>
      {selectedChat ? (
        <>
          <div className='fs-4 p-2 d-flex w-100 justify-content-between align-items-center'>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdatedGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </div>
          <div className='d-flex flex-column justify-content-end p-3 chatbox w-100 h-100 overflow-hidden rounded'>
            {loading ? (
              <Spinner />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}

            <div onKeyDown={sendMessage} required>
              <input
                className='bg-transparent form-control'
                placeholder='Enter a message...'
                onChange={onTyping}
                value={newMessage}
              />
            </div>
          </div>
        </>
      ) : (
        <div className='d-flex align-items-center justify-content-center h-100'>
          <h3>Click on a user to start chatting</h3>
        </div>
      )}
    </>
  )
}
