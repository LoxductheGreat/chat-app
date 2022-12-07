import React from 'react'

function LoadSingleChat () {
  return (
    <div className='d-flex singlechatspinner align-items-center'>
      <div className='spinner-border text-dark' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}

export default LoadSingleChat
