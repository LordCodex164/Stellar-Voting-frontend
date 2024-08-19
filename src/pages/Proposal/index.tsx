import React, {useEffect, useState} from 'react'
import { FaPlus } from 'react-icons/fa'
import { getProposal } from '../../Backend/Proposal'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import ProposalItem from '../../components/Proposal/ProposalItem'

const ProposalPage = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [proposals, setProposals] = useState<{_id:number, title: string, description:string, amount:string, status:string, deadline:number}[]>([])
    const state = useSelector((state: {keyId: string, devInfo:string | null, publicKey:string}) => state)
    const [isLoading, setIsLoading] = useState(false)

    const handleGetAllProposals = async () => {
       setIsLoading(false)
        try {
           const response = await getProposal(state.publicKey as unknown as number)
           console.log(response)
           setProposals(response)
           setIsLoading(false)
        } catch (error:any) {
            console.log(error)
            toast.error(error?.message || error?.response.data)
        }
        
    }

    useEffect(() => {
     handleGetAllProposals()
    }, [])


  return (
    <>
    {isLoading ?
     <ClipLoader size={20}/>
     :
     <div className="container mx-auto p-4">
    <div className="">
      <h1 className="text-3xl font-bold text-center">Community Proposals</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-[40px]">
      {proposals.length > 0 ? proposals.map((proposal) => (
        <ProposalItem  key={proposal._id} proposal={proposal} />
      ))
      :
      <p className="text-gray-500 mt-4">No proposals</p>
    }
    </div>

    </div>
    }
    
    </>
    
  )
}

export default ProposalPage