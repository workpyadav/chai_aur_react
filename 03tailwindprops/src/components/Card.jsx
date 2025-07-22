import React from 'react'

function Card(username, btnText="visit me") {
    console.log(username);
  return (
    <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
  <div>
    <img className="size-48 shadow-xl rounded-md" alt="" src="https://images.pexels.com/photos/33025920/pexels-photo-33025920.jpeg" />
  </div>
  <div className="flex items-center md:items-start">
    <h1>{username}</h1>
    <span className="text-2xl font-medium">Class Warfare</span>
    <span className="font-medium text-sky-500">The Anti-Patterns</span>
    <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
      <span>No. 4</span>
      <span>·</span>
      <span>2025</span>
    </span>
  </div>
</div>
  )
}

export default Card