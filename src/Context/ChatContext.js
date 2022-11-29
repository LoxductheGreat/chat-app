import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ChatContext = createContext()

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState()
  const [notification, setNotification] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)

  }, [])

  return (
    <ChatContext.Provider value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat, notification, setNotification }}>
      {children}
    </ChatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(ChatContext)
}

export default ChatProvider
