import React from 'react'
import './BookNavbar.css';
import arrow from '/bookNavbar/arrow.png';
const BookNavbar = () => {
  return (
    <>
        <header>
            <img src={arrow} alt="arrow" className='arrow'/>
            <h1>Book Tickets</h1>
            <div>
                <p>User</p>
            </div>
        </header>
    </>
  )
}

export default BookNavbar