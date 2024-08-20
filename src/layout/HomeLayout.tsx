import React from 'react'
import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideMenu from '../components/SideMenu/SideMenu'
import TopBar from '../components/TopBar/Index'


const RootLayout = () => {

    const navigate = useNavigate()
   
    //create the useSelector state

    ///create a function that stores data in the state

    const user = useSelector((state: {publicKey:string}) => state)

    console.log(user)

    if(user.publicKey === ""){
      return <Navigate to={"/auth"}/>
    }

  return (
    <div className='flex min-h-screen'>
      <SideMenu data={true}/>
      <div className='w-full flex-1'>
        <TopBar data={{}}/>
        <div id='detail' className=''>
        <Outlet/>
       </div>
      </div>
      
    </div>
  )
}

export default RootLayout