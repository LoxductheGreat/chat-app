import React from 'react'

function LoadSingleChat () {
  return (
    <div className='align-items-center m-auto'>
      <div className='spinner-border text-dark singlechatspinner' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}

export default LoadSingleChat
