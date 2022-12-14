import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../Context/ChatContext'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './ChatLogic'

function ScrollableChat ({ messages }) {
  const { user } = ChatState()
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className='d-flex nice' key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img className='chatimg rounded-circle' name={m.sender.username} src={m.sender.pic} data-bs-toggle='tooltip' data-bs-placement='bottom' data-bs-title='Tooltip on top' />
            )}

            <span style={{ backgroundColor: `${m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`, borderRadius: '20px', padding: '5px 15px', maxWidth: '75%', marginLeft: isSameSenderMargin(messages, m, i, user._id), marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10 }}>
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
