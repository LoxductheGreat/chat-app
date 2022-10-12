import React, { useState, useEffect } from 'react'
import { ChatState } from '../Components/ChatContext'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import Header from './Header'

function HomePage () {
  // const { user } = ChatState()

  return (
    <div className='hp-container'>
      <Header />
      <div className='chs-container'>
        <ChatList />
        <ChatBox />
      </div>
    </div>
  )
}

export default HomePage
