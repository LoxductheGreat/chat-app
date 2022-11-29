import React, { useEffect } from 'react'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import Header from './Header'
import { ChatState } from '../Context/ChatContext'
import { useNavigate } from 'react-router-dom'

function HomePage () {
  const { user } = ChatState()

  const nav = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (!userInfo) {
      nav('/login')
    }
  }, [nav])

  return (
    <div className='vw-100'>
      {user && <Header />}
      <div className='d-flex justify-content-between homepagebody'>
        {user && <ChatList />}
        {user && <ChatBox />}
      </div>
    </div>
  )
}

export default HomePage
