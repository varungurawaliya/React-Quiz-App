import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import data from './QuestionData/data'

function Ques() {

    const navigate = useNavigate()
    const isMounted = useRef(false);                            //track the mounting of component
    const total = data.length                                   //total number of questions

    const [count, setCount] = useState(0)
    const [score, setScore] = useState(0)
    const [showButton, setShowButton] = useState(false)
    const [selected, setSelected] = useState(-1)  
    
    useEffect(() => {                                           // useEffect when quiz starts or refreshes

        const count = localStorage.getItem('count')             //get values from local storage & assign to states
        if(count)
            setCount(Number(count))

        const score = localStorage.getItem('score')
        if(score)
            setScore(Number(score))
            
        const selected = localStorage.getItem('selected')       
        if(selected != -1){
            setSelected(Number(selected))
            setShowButton(true)
        }

        if(document.getElementById(selected))                   //If option selected previously i.e. before refreshing
            document.getElementById(selected).checked = true
    
    }, [])

    useEffect(() => {

        if (isMounted.current) {                                //It does not run when component is mounted

            localStorage.setItem('count', count)
            localStorage.setItem('selected', selected) 
            localStorage.setItem('score', score)  

        } else 
            isMounted.current = true

    }, [count, selected, score])   

    const nextQuestion = () => {                               

        handleSubmit()                                          //update the score

        if(count+1 == total)                                    //navigate if it is the last question
            navigate('/result')
        
        else {

            setCount(prev => prev+1)                            //update states and disable button
            setSelected(-1)
            setShowButton(false)

            document.getElementById("question").reset()         //reset the form
        }
    } 

    const handleSubmit = () => {

        if(data[count].correct == selected)                     //check for correct answer
            setScore(prev => prev+1)                    
    }

    const handleClick = (e) => {                                //continuously update option choice state

        setSelected(e.target.value);  
        setShowButton(true) 
    }

  return (
    <div className="flex flex-col items-center justify-start w-[80%]">       

        <div className='w-full flex flex-col items-center bg-orange-500 my-10'>
            
            <div className="bg-white font-semibold text-xl px-4 py-1 my-4">Question {count+1}/{total}</div>
            <div className='text-white text-xl font-semibold mb-5'>{data[count].question}</div>
        </div>               

        <form className='flex flex-col gap-5 w-full' id = "question">
        {
            data[count].answers.map((answer, index) => (

                <label key={index} className='border-orange-400 border-2 py-4 px-10 text-blue-700 text-xl font-semibold w-full flex gap-5'>
                    
                    <input type="radio" name="answers" id={index + 1} value={index + 1} onClick={handleClick}/>

                    {answer}
                </label>
            ))
        }
        </form>

        <div className='mt-4'>
        {
            showButton ? 

            <button className='text-base font-medium px-4 py-2 bg-black text-white shadow hover:bg-black/90'
                    onClick={() => nextQuestion()} >

                {count+1 === total ? 'Finish Quiz' : 'Next Question'}   
                 
            </button> : null
        }
        </div>            
    </div>  
    )
}

export default Ques