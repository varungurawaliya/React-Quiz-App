import React from 'react'
import { useNavigate } from 'react-router-dom'

function Result() {

  const score = localStorage.getItem('score')   //accessing the score from localStorage
  const navigate = useNavigate()

  const restart = () => {

    localStorage.clear()    //clear local localStorage
    navigate('/')           // navigate to homepage

  }


  return (
    <div className='flex flex-col gap-10 font-semibold text-3xl'>

      <div className='text-4xl'>Your Score : {score}</div>

      <button className='text-blue-700 hover:underline'
        onClick={() => {restart()}}>
        Restart Quiz</button>

    </div>
  )
}

export default Result