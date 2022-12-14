import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatContext'
import { getSender, getSenderFull } from './ChatLogic'
import ProfileModel from './ProfileModel'
import UpdatedGroupChatModel from './UpdatedGroupChatModel'
// import LoadSingleChat from './LoadSingleChat'
import Spinner from '../Animations/Spinner'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from '../Animations/Typing.json'

const ENDPOINT = 'http://localhost:2500'
var socket, selectedChatCompare

export default function SingleChat ({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState()
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

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

      socket.emit('join chat', selectedChat._id)
    } catch (error) {

    }
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user)
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
  }, [])

  useEffect(() => {
    fetchMessages()

    selectedChatCompare = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (!selectedChat || selectedChatCompare._id !== newMessageRecieved.chat._id) {

      } else {
        setMessages([...messages, newMessageRecieved])
      }
    })
  })

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id)
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

        socket.emit('new message', data)
        setMessages([...messages, data])
      } catch (error) {

      }
    }
  }

  const onTyping = (e) => {
    setNewMessage(e.target.value)

    if (!socketConnected) return

    if (!typing) {
      setTyping(true)
      socket.emit('typing', selectedChat._id)
    }

    const lastTypingTime = new Date().getTime()
    var timerLength = 3000

    setTimeout(() => {
      var timeNow = new Date().getTime()
      var timeDiff = timeNow - lastTypingTime

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id)
        setTyping(false)
      }
    }, timerLength)
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
              {isTyping ? <div><Lottie options={defaultOptions} width={70} style={{ marginBottom: 15, marginLeft: 0 }} /></div> : <></>}
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
