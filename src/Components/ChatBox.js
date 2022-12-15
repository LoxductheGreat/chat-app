import React from 'react'
import SingleChat from './SingleChat'

export default function ChatBox ({ fetchAgain, setFetchAgain }) {

  return (
    <div className='card col m-2 align-items-center flex-column p-2 rounded-4'>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  )
}
