import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css'
import { getAllProposal } from '../../Backend/Proposal'
import toast from 'react-hot-toast'
import {ClipLoader} from "react-spinners"
import VoteModal from '../../components/Vote/VoteModal';
import { startTransaction } from '../../lib/stellar';
import { Navigate } from 'react-router-dom';
import ProposalItem from '../../components/Proposal/ProposalItem';
import PageTitle from '../../components/PageTitle/PageTitle';

const Home = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [proposals, setProposals] = useState<{_id:number, title: string, description:string, publicKey:string, amount:string, status:string, deadline:number}[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVoteOpen, setIsVoteOpen] = useState<boolean>(false)
  const [proposalId, setProposalId] = useState<number>()
  const [proposalKey, setProposalKey] = useState<string>("")
  const [transaction, setTransaction] = useState<any>()
 
    
    const state = useSelector((state:{privateKey: string, devInfo:string | null, publicKey:string, pinCode:string, keyId:string}) => state)


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
     <div className='container mx-auto p-4 content-scroll'>
      <div className="">
        <PageTitle title='Community System Proposals'/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-[40px]">
      {proposals.length > 0 ? proposals.map((proposal) => (
        <ProposalItem proposal={proposal} isVoting={true} handleVote={handleVote as unknown as (proposalId: number, publicKey: string) => Promise<void>}/>
      )) : []}
      </div>
      </div>
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