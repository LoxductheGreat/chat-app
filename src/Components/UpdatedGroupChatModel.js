import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { ChatState } from '../Context/ChatContext'
import UserBadgeItem from './UserBadgeItem'
import axios from 'axios'
import Spinner from './Spinner'
import ChatItemList from './ChatItemList'

function UpdatedGroupChatModel ({ fetchAgain, setFetchAgain }) {
  const [groupChatName, setGroupChatName] = useState()
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const { selectedChat, setSelectedChat, user } = ChatState()

  const onAddUser = async (newUser) => {
    if (selectedChat.users.find((u) => u._id === newUser._id)) {
      console.log('user alrdy added')
      return
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      console.log('only admin can add someone!')
      return
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.put('https://chat-app-api-production-2f20.up.railway.app/api/chat/groupadd', {
        chatId: selectedChat._id,
        userId: newUser._id
      }, config)

      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    } catch (error) {

    }
  }

  const onRemove = async (user1) => {
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.put('https://chat-app-api-production-2f20.up.railway.app/api/chat/groupremove', {
        chatId: selectedChat._id,
        userId: user1._id
      }, config)

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    } catch (error) {

    }
  }

  const onRename = async () => {
    if (!groupChatName) return

    try {
      setRenameLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.put('https://chat-app-api-production-2f20.up.railway.app/api/chat/rename', {
        chatId: selectedChat._id,
        chatName: groupChatName
      }, config)

      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
    } catch (error) {

    }
    setGroupChatName('')
  }

  const onSearch = async (query) => {
    setSearch(query)
    if (query === '') {
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`https://chat-app-api-production-2f20.up.railway.app/api/user?search=${search}`, config)
      console.log(data)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {

    }
  }

  return (
    <>
      <button type='button' className='btn btn-light notti-button d-flex ' data-bs-toggle='modal' data-bs-target='#GroupProfileModel'> <FontAwesomeIcon icon={faEye} /> </button>

      <div className='modal fade' id='GroupProfileModel' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticModelLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header d-flex justify-content-center fs-4'>
              <h5 className='modal-title'>{selectedChat.chatName}</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body w=100'>
              <div className='d-flex flex-wrap'>
                {selectedChat.users.map(u => (
                  <UserBadgeItem key={u._id} user={u} handleFunction={() => onRemove(u)} />

                ))}
              </div>
              <div className='d-flex m-1'>
                <input type='text' className='d-flex form-control newgroupinput' placeholder='Chat name' onChange={(e => setGroupChatName(e.target.value))} />
                <button type='button' className='btn btn-success btn-sm updatebttn' onClick={onRename}>Update</button>
              </div>
              <input type='text' className='form-control m-1' placeholder='Add Users ex: guestuser' onChange={e => onSearch(e.target.value)} />
            </div>
            {loading ? (
              <Spinner />
            ) : (
                searchResult?.map((user) => (
                  <ChatItemList key={user._id} user={user} handleFunction={() => onAddUser(user)} />
                ))
            )}
            <div className='modal-footer'>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={() => onRemove(user)}>Leave Group</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatedGroupChatModel
