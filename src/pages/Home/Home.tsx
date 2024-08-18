import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactModal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../../components/CustomInput/CustomInput'
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css'
import {createProposal} from "../../Backend/Proposal"
import toast from 'react-hot-toast'

const Home = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedDeadlineMinute, setSelectedDeadlineMinute] = useState<number>(0)
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  console.log(title)
  console.log(description)

  const minuteOptions = Array.from({ length: 6 }, (_, i) => ({
    label: `${(i + 1) * 5} minutes`,
    value: (i + 1) * 5
}));

const amountOptions = Array.from({length: 5}, (_, i) =>  ({
  label: `${(i + 10) * 2} XLM`,
  value: (i + 10) * 2
}))


const handleChange = (e:any) => {
  console.log(e.value)
  setSelectedDeadlineMinute(e.value)
}

const handleChangeAmount = async (e:any) => {
  setSelectedAmount(e.value)
  
}

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      maxHeight: 'calc(100vh - 100px)',
      padding: '0px',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      height: 'auto',
      borderRadius: '10px',
      border: '0.01px solid #888',
    },
    overlay: {
      zIndex: '99',
      backgroundColor: 'rgba(6, 24, 2, 0.55)',
    },
  }
 
    
    const state = useSelector((state:{privateKey: string, devInfo:string | null, publicKey:string}) => state)


    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
     if(!title && !description && !selectedDeadlineMinute && !selectedAmount) {
      toast.error("Please fill in all the details")
      return;
     }
     
     try {
      await createProposal({title, publicKey:state.publicKey, amount: selectedAmount, deadlineMinutes: selectedDeadlineMinute, description: description})
      setTitle("")
      setDescription("")
      setSelectedDeadlineMinute(0)
      setSelectedAmount(0)
      setIsOpen(false)
     } catch (error:any) {
      console.log(error)
      toast.error(error)
     }    
    }
    
  return (
    <>
    <div className='min-h-full'>
      <div className='pt-[50px] pl-[50px]'>
        <p className='text text-center'>There are no current projects to vote</p>

        <div className='text-center'>
          <h1>Do you want to propose a project</h1>
          <p>Click Here to get Started?</p>
          <button onClick={() => setIsOpen(true)} className='border-[#000] border-[2px] px-[10px] py-[10px] hover:shadow-md'>Propose a Project</button>
        </div>
        
      </div>
   </div>

   <ReactModal isOpen ={isOpen} style={customStyles}>
      <div className='flex flex-col justify-center items-center py-[30px]'>

        <div className='flex flex-row gap-[30px] justify-between mb-[10px] w-full lg:px-[40px] text-center items-center'>
          <h1 className='text-2xl font-bold'>Propose a Project</h1>
          <span><FaTimes className='cursor-pointer' onClick={() => setIsOpen(false)} /></span>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-[30px]'>
            <div>
            <CustomInput value={title} setValue={setTitle} styles='block text-sm font-medium text-gray-700 min-w-[450px] py-[6px] px-[6px]' label='Title of the Project'/>
          </div>
          <div>
            <CustomInput value={description} setValue={setDescription} styles='block text-sm font-medium text-gray-700 min-w-[450px] py-[6px] px-[6px]' label='Description'/>
          </div>
          <div className='flex flex-col'>
          <label>Amount to fund the Project</label>
          <Dropdown
                options={amountOptions} 
                value={selectedAmount} 
                onChange={handleChangeAmount} 
                placeholder="Select Amount" 
                max={1}
                className='min-w-[450px] ring-blue-200 hover:ring-blue-600 ring-2 text-[8px]'
                maxLength={1}
            />
          </div>

          <div className='flex flex-col'>
            <label>Deadline</label>
          <Dropdown
                options={minuteOptions} 
                value={selectedDeadlineMinute} 
                onChange={handleChange} 
                placeholder="Select Minutes" 
                max={1}
                className='min-w-[450px] ring-blue-200 hover:ring-blue-600 ring-2'
                maxLength={1}
            />
          </div>
          <div className='pt-[10px]'>
            <button className='duration-800 border-black border-dotted border-[1px] py-[6px] hover:border-[2px] w-full hover:scale-105 transition ease-in hover:ease-in-out shadow-sm hover:focus:outline-none hover:focus:ring-blue-400'>Create</button>
          </div>
          </div>
          
      </form>
 
        </div>
    </ReactModal>
    </>
      
   
  )
}

export default Home