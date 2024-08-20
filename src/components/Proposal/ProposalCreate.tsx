import { AiOutlinePlus } from 'react-icons/ai'

interface ProposalCreateProps {
   isOpen?: boolean,
   handleIsOpen: () => void
}

const ProposalCreate = ({handleIsOpen}: ProposalCreateProps) => {
  return (
    <div className='border-[2px] border-gray-300 border-dotted min-h-[250px] flex justify-center items-center max-w-[454px] mt-[10px] rounded-[10px]'>
      <div className='mt-[40px]'>
        <div className='text-center'>
          <h1>Do you want to propose a project</h1>
          <p>Click Here to get Started?</p>
          <button onClick={handleIsOpen} className='border-[#000] inline-flex gap-[10px] items-center focus:outline-none focus:border-[2px] border-[2px] px-[10px] py-[10px] hover:shadow-md'>
            Propose a Project <AiOutlinePlus/>
            </button>
        </div>
      </div>
    </div>
    
  )
}

export default ProposalCreate