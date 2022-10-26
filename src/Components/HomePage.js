import React from 'react'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import Header from './Header'

function HomePage () {
  return (
    // <div className='card h-100'>
    //   <Header />
    //   <div className='d-flex flex-row justify-content-around nice'>
    //     <ChatList />
    //     <ChatBox />
    //   </div>
    // </div>
    <body>
      <div>
        <Header />
        <div className='row n'>
          <div className='col-4'>
            <ChatList />
          </div>
          <div className='col-8'>
            <ChatBox />
          </div>
        </div>
      </div>
      {/* <div className=' d-flex  bg-info h-100'> */}
      {/* </div> */}
      {/* <div className='d-flex  h-100'> */}
      {/* <ChatBox /> */}

      {/* </div> */}
    </body>
  )
}

export default HomePage
