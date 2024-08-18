import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactModal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../../components/CustomInput/CustomInput'
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css'
import {createProposal} from "../../Backend/Proposal"
import { getAllProposal } from '../../Backend/Proposal'
import toast from 'react-hot-toast'
import {ClipLoader} from "react-spinners"
import { AiOutlinePlus } from 'react-icons/ai';
import ProposalModal from '../../components/Proposal/ProposalModal'

const Home = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedDeadlineMinute, setSelectedDeadlineMinute] = useState<number>(0)
  const [proposals, setProposals] = useState<{_id:number, title: string, description:string, amount:string, status:string, deadline:string}[]>([])
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")


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

const handleChangeAmount = (e:any) => {
  setSelectedAmount(e.value)
  
}
 
    
    const state = useSelector((state:{privateKey: string, devInfo:string | null, publicKey:string}) => state)


    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
     if(!title && !description && !selectedDeadlineMinute && !selectedAmount) {
      toast.error("Please fill in all the details")
      return;
     }
     setIsLoading(true)
     try {
      await createProposal({title, publicKey:state.publicKey, amount: selectedAmount, deadlineMinutes: selectedDeadlineMinute, description: description})
      setTitle("")
      setDescription("")
      setSelectedDeadlineMinute(0)
      setSelectedAmount(0)
      setIsOpen(false)
      setIsLoading(false)
      handleGetAllProposals()
     } catch (error:any) {
      console.log(error)
      toast.error(error)
     }    
    }

    const handleGetAllProposals = async () => {
      setIsLoading(true)
      try {
         const response = await getAllProposal()
         console.log(response)
         setProposals(response)
         setIsLoading(false)
      } catch (error:any) {
          toast.error(error?.message || error?.response.data)
      }
      
  }

  useEffect(() => {
   handleGetAllProposals()
  }, [])

    
  return (
    <>
    {isLoading ?
    <div className='min-h-screen flex justify-center items-center'>
      <ClipLoader className=''/>
    </div>
     
     : 
     <>
     <div className='container mx-auto p-4'>
      <div className="">
        <h1 className="text-3xl font-bold text-center">Community Voting System</h1>
        <p>List of Proposals By Other Users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-[40px]">
      {proposals.map((proposal) => (
        <div key={proposal._id} className="border flex-col space-y-3 p-4 rounded-md shadow">
          <h2 className="text-xl font-bold mb-2">{proposal.title}</h2>
          <p className="mb-2">{proposal.description}</p>
          <p className="mb-2">Amount: {proposal.amount} XLM</p>
          <p className="mb-2">Status: {proposal.status}</p>
          <p>Time left: </p>
          <button className='duration-700 shadow-md transition-all scale-75 active:scale-100  hover:scale-90 max-w-[100px] ring-black ring-[0.1em] focus:border-dotted focus:border-[2px] focus:border-black hover:ring-blue-700 hover:animate-pulse px-[10px] py-[7px]'>Vote</button>
        </div>
      ))}
    </div>
      <div className='pt-[50px] mt-[40px]'>

        <div className='text-center'>
          <h1>Do you want to propose a project</h1>
          <p>Click Here to get Started?</p>
          <button onClick={() => setIsOpen(true)} className='border-[#000] inline-flex gap-[10px] items-center focus:outline-none focus:border-[2px] border-[2px] px-[10px] py-[10px] hover:shadow-md'>
            Propose a Project <AiOutlinePlus/>
            </button>
        </div>
        
      </div>
   </div>
   <ProposalModal
    onClose={() => setIsOpen(false)}
    isOpen={isOpen}
    amountOptions={amountOptions}
    minuteOptions={minuteOptions}
    selectedAmount={selectedAmount}
    selectedDeadlineMinute={selectedDeadlineMinute}
    setDescription={setDescription}
    setTitle={setTitle}
    title={title}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    deadline={""}
    description={description}
    handleChangeAmount={handleChangeAmount}
   />
    </>
    }
    

   
    </>
      
   
  )
}

export default Home