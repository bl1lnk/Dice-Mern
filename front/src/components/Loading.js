import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '10px',
        height: '10px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loading
