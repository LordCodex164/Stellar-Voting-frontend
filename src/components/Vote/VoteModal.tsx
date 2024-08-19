import React, { startTransition, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { startTransaction, submit } from '../../lib/stellar';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { submitVote } from '../../Backend/vote';

interface VoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposalId: number;
    setProposalId: React.Dispatch<React.SetStateAction<number | undefined>>;
    proposalKey:string;
    transaction:string;
}

const VoteModal = ({isOpen, onClose, proposalId, proposalKey, transaction}: VoteModalProps) => {

    const user = useSelector((state: {publicKey:string}) => state)

    const [isVoting, setIsVoting] = useState(false)

    console.log("transaction>>", transaction)

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
          width: '450px',
          height: 'auto',
          borderRadius: '10px',
          border: '0.01px solid #888',
        },
        overlay: {
          zIndex: '99',
          backgroundColor: 'rgba(6, 24, 2, 0.55)',
        },
      }

      const handleSubmit = async (transaction:any) => {
        setIsVoting(true)
        try {
        const signedTransaction:any =  await submit(transaction)
        await submitVote({voter: user.publicKey, proposalId, amount: signedTransaction.fee_charged, transactionId:signedTransaction.id})
        toast.success('Vote submitted successfully')
        setIsVoting(false)
        onClose()
        } catch (error:any) {
            toast.error(error?.message || error?.response.data)
            setIsVoting(false)
        }
      }



  return (
   <ReactModal isOpen ={isOpen} style={customStyles}>
    <div className='flex flex-col justify-center items-center py-[30px]'>

      <div className='flex flex-row gap-[30px] justify-between mb-[10px] w-full lg:px-[40px] text-center items-center'>
        <h1 className='text-2xl font-bold'>Vote for this Project For Just 0.001XHM</h1>
        <span><FaTimes className='cursor-pointer' onClick={onClose} /></span>
      </div>

      <button onClick={() => handleSubmit(transaction)} className='bg-green-200 hover:bg-green-600 focus:bg-green-700 focus:outline-none px-[8px] py-[10px] hover:text-white rounded-[10px]'>{isVoting ? "Please Wait..." : "Vote"} </button>

      </div>
    </ReactModal>
  )
}

export default VoteModal