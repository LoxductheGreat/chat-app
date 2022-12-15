import React, { useEffect, useState } from 'react'
import ChatBox from '../Components/ChatBox'
import ChatList from '../Components/ChatList'
import Header from '../Components/Header'
import { ChatState } from '../Context/ChatContext'
import { useNavigate } from 'react-router-dom'

function Home () {
  const { user } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)

  const nav = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (!userInfo) {
      nav('/login')
    }
  }, [nav])

  return (
    <div className='w-100'>
      {user && <Header />}
      <div className='d-flex justify-content-between w-100 homepg'>
        {user && (<ChatList fetchAgain={fetchAgain} />)}
        {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
      </div>
    </div>
  )
}

export default Home
