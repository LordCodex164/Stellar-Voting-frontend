import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    
    const state = useSelector((state) => state)
    console.log(state)
    
  return (
   <div className='debug min-h-full'>
     
   </div>
  )
}

export default Home