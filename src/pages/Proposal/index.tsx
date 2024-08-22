import {useEffect, useState} from 'react'
import { createProposal, getProposal } from '../../Backend/Proposal'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import ProposalItem from '../../components/Proposal/ProposalItem'
import ProposalCreate from '../../components/Proposal/ProposalCreate'
import ProposalModal from '../../components/Proposal/ProposalModal'
import PageTitle from '../../components/PageTitle/PageTitle'

const ProposalPage = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [proposals, setProposals] = useState<{_id:number, title: string, description:string, publicKey:string, amount:string, votes: number, status:string, deadline:number}[]>([])
    const state = useSelector((state: {keyId: string, devInfo:string | null, publicKey:string}) => state)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDeadlineMinute, setSelectedDeadlineMinute] = useState<number>(0)
    const [selectedAmount, setSelectedAmount] = useState<number>(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleChange = (e:any) => {
      setSelectedDeadlineMinute(e.value)
    }

    //create a function that stores the publicKey

    const handleChangeAmount = (e:any) => {
      setSelectedAmount(e.value)
      
    }

    const handleGetAllProposals = async () => {
       setIsLoading(true)
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

  const minuteOptions = Array.from({ length: 6 }, (_, i) => ({
      label: `${(i + 1) * 5} minutes`,
      value: (i + 1) * 5
  }));
  
  const amountOptions = Array.from({length: 5}, (_, i) =>  ({
    label: `${(i + 10) * 2} XLM`,
    value: (i + 10) * 2
  }))

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
    setIsModalOpen(false)
    setIsLoading(false)
    handleGetAllProposals()
   } catch (error:any) {
    console.log(error)
    toast.error(error)
   }    
  }

    useEffect(() => {
     handleGetAllProposals()
    }, [])

  return (
    <>
    {isLoading ?
    <div className='flex justify-center min-h-[100vh] items-center'>
       <ClipLoader size={30}/>
    </div>
     :
     <div className="container mx-auto p-4 dashboard-content-scroll">
       <PageTitle title='Your Proposals'/>
     <div className='grid w-full grid-flow-row'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 pt-[40px]">
      {proposals.length  > 0 && proposals ? proposals.map((proposal) => (
        <ProposalItem  key={proposal._id} proposal={proposal} />
      ))
      :
      <p className="text-gray-500 mt-4">No proposals</p>
    }
    </div>

    <div>
      <ProposalCreate isOpen={isModalOpen} handleIsOpen={() => setIsModalOpen(true)}/>
    </div>

    </div>
     
    <ProposalModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
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

    </div>
    }
    
    </>
    
  )
}

export default ProposalPage