import React, {useEffect, useState} from 'react'
import { FaPlus } from 'react-icons/fa'
import { getProposal } from '../../Backend/Proposal'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const ProposalPage = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [proposals, setProposals] = useState<{_id:number, title: string, description:string, amount:string, status:string, deadline:string}[]>([])
    const state = useSelector((state: {keyId: string, devInfo:string | null, publicKey:string}) => state)

    const handleGetAllProposals = async () => {
        try {
           const response = await getProposal(state.publicKey)
           console.log(response)
           setProposals(response)
        } catch (error:any) {
            console.log(error)
            toast.error(error?.message || error?.response.data)
        }
        
    }

    useEffect(() => {
     handleGetAllProposals()
    }, [])


  return (
    <div className="container mx-auto p-4">
    <div className="">
      <h1 className="text-3xl font-bold text-center">Community Proposals</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-[40px]">
      {proposals.map((proposal) => (
        <div key={proposal._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">{proposal.title}</h2>
          <p className="mb-2">{proposal.description}</p>
          <p className="mb-2">Amount: {proposal.amount} XLM</p>
          <p className="mb-2">Status: {proposal.status}</p>
          <p>Time left: </p>
        </div>
      ))}
       {proposals.length === 0 && (
        <p className="text-gray-500 mt-4">No proposals</p>
      )}
    </div>

    </div>
  )
}

export default ProposalPage