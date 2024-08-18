import React, {useState, useEffect} from 'react'
import { BsBell } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
// import MobileSidemenu from '../SideMenu/MobileSidemenu';
import { BiMenu } from 'react-icons/bi';
import { FaNimblr } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const TopBar = ({data}:any) => {

  const [showProfile, setShowProfile] = useState<boolean>(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }
  const handleShowMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };


  return (
    <>
    <div className='bg-[#C9EBF3]  hidden sm:block w-full px-[10px] py-[20px]'>
        <div className='flex justify-between items-center pl-[30px] lg:pr-[50px]'>
            <input type="text" className='oultine outline-none min-w-[350px] pl-[10px] py-[10px] rounded-[2px]' placeholder='Search'/>

            <div className='flex relative items-center gap-[20px]'>
              <BiSolidUser onClick={handleShowProfile} className='w-[80px] h-[22px]'/>
               {showProfile &&<div className='absolute top-[22px] right-20 px-[10px] py-[20px] rounded-[10px] bg-[#fff] shadow-md z-10'>
                 <Link to={"/Profile"}>Profile</Link>
               </div>}
              
            </div>

        </div>
    </div>

    <div className="flex relative sm:hidden w-full flex-row">
        <div className="absolute z-30">
          {/* {showMobileMenu && <MobileSidemenu handleShowMobileMenu={handleShowMobileMenu} />} */}
        </div>
        <div className="h-[66px] flex lg:hidden border items-center justify-between w-full px-[50px] sticky overflow-y-hidden top-0 bg-[#F2F9FD] z-10">
          <div className="flex flex-row  justify-between items-center  w-full">
            <div>
              <FiMenu onClick={handleShowMobileMenu}/>
            </div>
            <div>
            <BiSolidUser onClick={handleShowProfile} className='w-[80px] h-[22px]'/>
            </div>
           
          </div>
        </div>
      </div>
    </>
    
  )
}

export default TopBar