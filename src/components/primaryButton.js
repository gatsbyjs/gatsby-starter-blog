import React from 'react'

const PrimaryButton = ({ text, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="bg-gray-900 dark:bg-white dark:hover:bg-gray-300 hover:bg-gray-500 focus:outline-none text-white dark:text-black font-medium py-2 px-4 mt-2">
      <p>{text}</p>
    </button>
  )
}

export default PrimaryButton