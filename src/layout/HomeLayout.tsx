import React from 'react'
import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'



const HomeLayout = () => {

    const navigate = useNavigate()
   
    //create the useSelector state

    const user = useSelector(state => state)

  return (
    <div>
        HomeLayout
    </div>
  )
}

export default HomeLayout