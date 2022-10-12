import React, { useEffect, useState } from 'react'
import { userChats } from './api'

function ChatList () {
  const [chatList, setChatList] = useState([])

  // const { user } = ChatState()

  // useEffect(() => {
  //   userChats().then(x => {
  //     setChatList(x)
  //     console.log(x)
  //   })
  // }, [user])

  return (
    <div className='cl-container'>ChatList</div>
    // <div>{chatList.map((clist) => (
    //   <p key={clist._id}>
    //     {clist.chatName}
    //   </p>
    // ))}</div>
  )
}

export default ChatList
