import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import Header from './Header'
import { ChatState } from '../Context/ChatContext'
import { useNavigate } from 'react-router-dom'

function HomePage () {
  const { user } = ChatState()
  const [fetchAgain, setfetchAgain] = useState(false)

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
        {user && (<ChatList fetchAgain={fetchAgain} />)}
        {user && (<ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />)}
      </div>
    </div>
  )
}

export default HomePage
