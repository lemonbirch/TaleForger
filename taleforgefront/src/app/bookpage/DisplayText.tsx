import React from 'react'

const DisplayText = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">My Awesome Book</h1>
      <p className="text-lg text-gray-700 mb-4 leading-loose">
        Once upon a time, in a land far, far away, there was a magical kingdom filled with wonder and excitement...
        The brave knights and clever wizards worked together to protect the realm from evil dragons and mischievous goblins...
      </p>
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-yellow-200 rounded-tl-3xl shadow-2xl flex items-center justify-center">
            <span className="text-xl font-bold text-yellow-800">1</span>
      </div>
    </div>
  )
}

export default DisplayText