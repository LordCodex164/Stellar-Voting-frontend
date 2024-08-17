import React from 'react'
import { Link } from 'react-router-dom'

const AuthPage = () => {
  return (
    <div className='text-center pt-[30px] flex flex-col justify-center min-h-[100vh] debug items-center'>
        <div className='text-blue-500'>
            <p className='text-[18px] font-light'>Stellar Community Voting <br/> Platform!</p>
        </div>
        <div className='flex gap-7 mt-[10px]'>
         <Link to={"/auth/login"}><button className='bg-blue-400 px-[10px] py-[12px] border-r-blue-500 hover:border-r-blue-800 shadow-lg hover:text-[#fff] text-[15px]'>Login</button></Link> 
         <Link to={"/auth/signup"}><button className='bg-blue-400 px-[10px] py-[12px] border-r-blue-500 hover:border-r-blue-800 shadow-lg hover:text-[#fff] text-[15px]'>Sign up</button></Link> 
        </div>
      </div>
  )
}

export default AuthPage