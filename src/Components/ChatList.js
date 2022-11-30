import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ChatState } from '../Context/ChatContext'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import { getSender } from './ChatLogic'
import ChatItemList from './ChatItemList'
import UserBadgeItem from './UserBadgeItem'

function ChatList ({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState()
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()

  const onSearch = async (query) => {
    setSearch(query)
    if (!query) {
      return
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`https://chatting-app-api-chatify.herokuapp.com/api/user?search=${search}`, config)
      console.log(data)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      console.log('error on search')
    }
  }

  const onSubmit = async () => {
    // if (!groupChatName || !selectedUsers) {
    //   return
    // }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.post('https://chatting-app-api-chatify.herokuapp.com/api/chat/group', {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id))
      }, config)

      setChats([data, ...chats])
    } catch (error) {
      console.log('nice error')
    }
  }

  const handleGroup = (addUser) => {
    if (selectedUsers.includes(addUser)) {
      console.log('error user alrdy added')
      return
    }

    setSelectedUsers([...selectedUsers, addUser])
  }

  const onDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((s) => s._id !== delUser._id))
  }

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get('https://chatting-app-api-chatify.herokuapp.com/api/chat', config)
      setChats(data)
    } catch (error) {

    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
    fetchChats()
  }, [fetchAgain])

  return (
    <div className='card col m-2 col-4 mychatcard'>
      <div className='card-header d-flex justify-content-between'>
        <h2 className='card-title'>My Chats</h2>
        <button type='button' className='btn btn-primary float-right' data-bs-toggle='modal' data-bs-target='#newgroupBackdrop'>New Group Chat<FontAwesomeIcon icon={faPlus} /></button>
      </div>
      <div className='card-body'>
        {chats ? (
          <div className='h-auto'>
            {chats.map((chat) => (
              <button type='button' className='m-2 w-100 d-flex btn btn-light' onClick={() => setSelectedChat(chat)} key={chat._id}>
                <p>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : (chat.chatName)}</p>
              </button>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>

      {/* <------------ Model --------------> */}
      <div className='modal fade' id='newgroupBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'><b className='newgrouptitle'>Create Group Chat</b></h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body m-1'>
              <input type='text' className='d-flex form-control newgroupinput' placeholder='Chat name' onChange={(e => setGroupChatName(e.target.value))} />
              <input type='text' className='form-control' placeholder='Add Users ex: guestuser' onChange={e => onSearch(e.target.value)} />
              <br />
              <div className='w-100 d-flex flex-wrap'>
                {selectedUsers.map((u) => (
                  <UserBadgeItem key={u._id} user={u} handleFunction={() => onDelete(u)} />
                ))}
              </div>
              {loading ? <div>loading</div> : (
                searchResult?.slice(0, 4).map(user => (
                  <ChatItemList key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                ))
              )}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' data-bs-dismiss='modal' onClick={onSubmit}>Create Chat</button>
            </div>
          </div>
        </div>
      </div>
      {/* <------------ Model --------------> */}
    </div>
  )
}

export default ChatList
