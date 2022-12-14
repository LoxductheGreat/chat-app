import React from 'react'

function Spinner () {
  return (
    <div className='spinner-border text-secondary m-auto align-self-center w-25 h-50' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  )
}

export default Spinner
