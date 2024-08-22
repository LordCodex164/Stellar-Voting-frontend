import {useEffect, useState} from 'react'
import { Link, useLocation} from 'react-router-dom'
import cx from "classnames"
import { FiLogOut } from 'react-icons/fi'
import { FaWallet, FaMoneyBillWave, FaHome, FaUser, FaFileContract } from 'react-icons/fa'
import StellarLogo from "../../assets/stellar-logo.svg"

const SideMenu = ({data}:any) => {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const {pathname} = useLocation()

  const menuItems = [
    {
      paths:  ["/home"],
      label:  "Home",
      to: "/home",
      icon: <FaHome/>
    },
    {
      paths: ["/profile"],
      label: 'Your Proposals',
      to: "/proposals",
      icon: <FaFileContract/>
    },
    {
        paths: ["/balances"],
        label: 'Account Balance',
        to: "/balance",
        icon: <FaWallet/>
      },
    {
        paths: ['/payments'],
        label: 'Recent Payments',
        to: '/payments',
        icon: <FaMoneyBillWave/>
      },
    {
      paths: ['/auth/register'],
      label: 'Logout',
      to: '/auth/register',
      icon: <FiLogOut/>
    },
  ]

  const pathName = (location.pathname)
    
  const isActive = (paths: string[]) => {
    const isActivePath = paths.includes(pathName)
    return isActivePath
  }

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  } 

  
  
  const renderMenuItem = (menuItem: any) => {
    if(menuItem.label === "Logout" ) {
      return (
      <li key={menuItem.to}>
       <Link to={"/auth"}
        onClick={() => {}}
        className={cx({
          'h-[55px] flex justify-center items-center mt-[150px]': true,
            'w-full': !isCollapsed,
            'w-[59px]': isCollapsed,
            "hover:before:content-[''] hover:before:w-[10px] ": true,
            'hove] hover:before:h-[55px] hover:bg-[#e75045] text-white': true,
            'hover:before:relative  hover:rounded-r-[5px]': true,
            " visited:text-red-800": true
        })}
        >
           <div>
            {!isCollapsed && 
            <div className='text-[#000] text-center font-extralight text-[30px] flex gap-5 items-center'> 
               {menuItem.label}
               <span>{menuItem.icon}</span>
            </div>
            }
           </div>
        </Link>
      </li>
      )
      
    }
    return (
      <li key={menuItem.to}>
        <Link 
        to={menuItem.to}
        className={cx({
          'h-[55px] flex justify-center items-center my-[25px]': true,
            'w-full': !isCollapsed,
            'w-[59px]': isCollapsed,
            "hover:before:content-[''] hover:before:w-[10px] ": true,
            'hove] hover:before:h-[55px] hover:bg-[#C9EBF3]': true,
            'hover:before:relative  hover:rounded-r-[5px]': true,
            "active:text-red-600 visited:text-red-800": true,
            "hover:bg-[#c9ebf3] bg-[#9bd6e3]": isActive(menuItem.paths)
        })}
        >
           <div>
            {!isCollapsed && 
            <div className='text-[#000] text-left flex flex-row gap-5 items-center justify-center'> 
               {menuItem.label}
               {menuItem.icon}
            </div>
            }
           </div>
        </Link>
      </li>
    )
  }

  //something to make thelink active

  useEffect(() => {

  }, [])

  return (
    <aside className={cx("hidden lg:block overflow-y-hidden min-h-screen sm:block top-0 left-0 bottom-0 text-center bg-[#d9dae3] border-r-[2px] border-[#d9dae3] pt-[40px] px-[15px] z-10", {
      "w-[50px]": isCollapsed,
      "w-[240px]": !isCollapsed
    })}>
       <nav className=''>
           <ul className=''>
            <div className='text text-left font-bold'>
                <span><img src={StellarLogo} className='object-fill min-w-[40px] h-[40px]' alt="stellar-logo" /></span>
                <span>Community Voting System</span>
            </div>
            {menuItems.map((item) => renderMenuItem(item))}
           </ul>
       </nav>

       
    </aside>
  )
}

export default SideMenu