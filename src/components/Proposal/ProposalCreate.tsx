import { AiOutlinePlus } from 'react-icons/ai'

interface ProposalCreateProps {
    onClose: () => void
}

const ProposalCreate = ({onClose}: ProposalCreateProps) => {
  return (
    <div className='pt-[50px] mt-[40px]'>

    <div className='text-center'>
      <h1>Do you want to propose a project</h1>
      <p>Click Here to get Started?</p>
      <button onClick={onClose} className='border-[#000] inline-flex gap-[10px] items-center focus:outline-none focus:border-[2px] border-[2px] px-[10px] py-[10px] hover:shadow-md'>
        Propose a Project <AiOutlinePlus/>
        </button>
    </div>
    
  </div>
  )
}

export default ProposalCreate