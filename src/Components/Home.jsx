import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center gap-32 font-semibold text-3xl'>

        <div className='text-5xl font-bold'>WELCOME</div>
        
        <button className='text-blue-700 text-3xl font-semibold hover:underline' 
        onClick={() => navigate('/quiz')}>
          Click to Start Quiz
        </button>
    </div>
  )
}

export default Home