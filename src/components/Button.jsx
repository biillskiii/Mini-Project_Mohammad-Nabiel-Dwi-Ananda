import React from 'react'

const Button = ({id, label, onClick}) => {
  return (
  <button
     id={id}
     onClick={onClick}
     className='hover:bg-green-900 focus:outline-none border-none w-3/12 h-10 ms-auto bg-green-600 rounded-md text-white font-semibold flex justify-center items-center text-lg ml-6 shadow-xl'
  >
    {label}
  </button>
  )
}

export default Button