import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css'
import {createProposal} from "../../Backend/Proposal"
import { getAllProposal } from '../../Backend/Proposal'
import toast from 'react-hot-toast'
import {ClipLoader} from "react-spinners"
import ProposalModal from '../../components/Proposal/ProposalModal'
import VoteModal from '../../components/Vote/VoteModal';
import ProposalCreate from '../../components/Proposal/ProposalCreate';
import { startTransaction } from '../../lib/stellar';
import { signHelperThunk } from '../../store/thunk';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedDeadlineMinute, setSelectedDeadlineMinute] = useState<number>(0)
  const [proposals, setProposals] = useState<{_id:number, title: string, description:string, publicKey:string, amount:string, status:string, deadline:string}[]>([])
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isVoteOpen, setIsVoteOpen] = useState<boolean>(false)
  const [proposalId, setProposalId] = useState<number>()
  const [proposalKey, setProposalKey] = useState<string>("")
  const [transaction, setTransaction] = useState<any>()

  const minuteOptions = Array.from({ length: 6 }, (_, i) => ({
    label: `${(i + 1) * 5} minutes`,
    value: (i + 1) * 5
}));

const amountOptions = Array.from({length: 5}, (_, i) =>  ({
  label: `${(i + 10) * 2} XLM`,
  value: (i + 10) * 2
}))

const dispatch = useDispatch()

const handleChange = (e:any) => {
  console.log(e.value)
  setSelectedDeadlineMinute(e.value)
}

const handleChangeAmount = (e:any) => {
  setSelectedAmount(e.value)
  
}
 
    
    const state = useSelector((state:{privateKey: string, devInfo:string | null, publicKey:string, pinCode:string, keyId:string}) => state)

    console.log(state)

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
          setIsLoading(true)
          toast.error(error || error?.response.data)
      }
  }

  useEffect(() => {
   handleGetAllProposals()
  }, [])

  const handleVote = async(id:number, key:string) => {
    setIsVoteOpen(true)
    setProposalId(id)
    setProposalKey(key)
   try {
    const {transaction} = await startTransaction(state.publicKey, state.privateKey, key, "payment memo")
    console.log(transaction)
    setTransaction(transaction)
    return transaction
   } catch (error:any) {
     toast.error(error?.message || error?.response.data)
   }
   finally{
   }
  }

  if(state.publicKey === ""){
    return <Navigate to="/auth"/>
  }
    
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
      {proposals? proposals.map((proposal) => (
        <div key={proposal._id} className="border flex-col space-y-3 p-4 rounded-md shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">{proposal.title}</h2>
          <p className="mb-2">{proposal.description}</p>
          <p className="mb-2">Amount: {proposal.amount} XLM</p>
          <p className="mb-2">Status: {proposal.status}</p>
          <p>Time left: </p>
          <button onClick={() => handleVote(proposal._id, proposal.publicKey)} className='duration-700 shadow-md transition-all scale-75 active:scale-100  hover:scale-90 max-w-[100px] ring-black ring-[0.1em] focus:border-dotted focus:border-[2px] focus:border-black hover:ring-blue-700 hover:animate-pulse px-[10px] py-[7px]'>Vote</button>
        </div>
      )) : []}
      </div>
        <ProposalCreate onClose={() => setIsOpen(true)}/>
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
      
        <VoteModal
        isOpen={isVoteOpen}
        onClose={() => setIsVoteOpen(false)}
        proposalId={proposalId as number}
        setProposalId={setProposalId}
        proposalKey={proposalKey}
        transaction={transaction}
        />
   
    </>
      
   
  )
}

export default Home