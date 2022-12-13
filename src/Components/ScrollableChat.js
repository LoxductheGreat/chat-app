import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../Context/ChatContext'
import { isLastMessage, isSameSender } from './ChatLogic'

function ScrollableChat ({ messages }) {
  const { user } = ChatState()
  return (
    <ScrollableFeed>
      {messages && messages.map((m, i) => (
        <div className='d-flex' key={m._id}>
          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
            <div className=''>
              <img className='chatimg' data-bs-toggle='tooltip' data-bs-placement='bottom' data-bs-title='Tooltip on bottom' src={m.sender.pic} />
            </div>
          )}
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
