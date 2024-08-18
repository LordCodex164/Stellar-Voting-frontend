import { registerWallet } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Keypair} from "@stellar/stellar-sdk"
import {  } from '../../store/actions'
import { useMemo, useState } from 'react'
import { confirmPinCodeThunk } from '../../store/thunk'
import toast from 'react-hot-toast'

const Login = () => {

    const dispatch = useDispatch()

    const state = useSelector((state: {keyId: string, devInfo:string | null, publicKey:string}) => state)

    const [pinCode, setPinCode] = useState("")

    const [publicKeyState, setPublicKeyState] = useState(state.publicKey)

    const navigate = useNavigate()

    const keypair = Keypair.random()

    console.log(state)

    const handleLogin = async (pinCode:string) => {
      console.log(pinCode)
      try {
       const account = await dispatch(confirmPinCodeThunk(pinCode, state.keyId))
        console.log(account)
        if(!account){
          toast.error("incorrect pincode")
          return;
        }
       else {
        toast.success("signed in")
        navigate("/home")
       } 
      } catch (error) {
        console.log(error)
      }
    }

    console.log(pinCode)

  return (
    <div className='min-h-[100vh] flex flex-col justify-center items-center'>

     <div className='border-[#5c9fcf] border-[3px] border-dotted flex min-w-[955px] justify-between min-h-full lg:py-[20px] items-center px-[20px]'>
        <div className='text-center text-blue-400'>
        <h1 className='text-[20px]'>Stellar Voting Plarform!</h1>
        <h1 className='text-[18px]'>Login Page</h1>
        </div>

       <div className='border-[#5c9fcf] min-w-[250px] min-h-[304px] px-[20px]'>
        <p>Enter Your Pin Code</p>
        <div className=''>

            <div className='flex flex-col gap-4'>

            <label>Public Key:</label>
            <input type="text" name="publickey" className='input outline-none outline-[] h-[3rem] shadow-sm border-black border-[1px] px-[0.2em]' value={publicKeyState} readOnly/> 

             <label>PinCode:</label>
             <input type="password" name="password" onChange={(e) => {
                e.preventDefault()
                setPinCode(e.target.value)
                }} className='input outline-none outline-[] h-[3rem] shadow-sm border-black border-[1px] px-[0.2em]' />  
            </div>

            <div className='flex justify-center bg-blue-500 mt-[20px] hover:text-white rounded-[0.5rem] py-[7px]'>
                <button type='button' onClick={() => handleLogin(pinCode)}>Login</button>
            </div>
        </div>
       </div>

     </div>
     
    </div>
  )
}

export default Login