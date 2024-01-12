import React from 'react'
import {Link} from 'react-router-dom'

const footer = () => {
  return (
    <div className='bg-dark text-light p-3'>
      <h4 className='text-center'>All Right Reserved &copy; Mega Mart</h4>
      <p className='footer'>
        <Link to="/about">About</Link>
        |
        <Link to="/contacts">Contact</Link>
        |
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default footer
