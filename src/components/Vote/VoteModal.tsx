import React, {useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { submit } from '../../lib/stellar';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { submitVote } from '../../Backend/vote';


interface EnvelopeType {
  name: string;
  value: number;
}

interface Memo {
  _switch: {
    _arm: string;
    _armType: string;
  };
  _value: string;
}

interface TimeBounds {
  minTime: string;
  maxTime: string;
}


interface Asset {
  code: string;
  issuer?: string; // optional, as some assets may not have an issuer
}

interface operations {
  amount: string;
  asset: Asset;
  destination: string;
  type: string;

}


interface VoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposalId: number;
    setProposalId: React.Dispatch<React.SetStateAction<number | undefined>>;
    proposalKey:string;
    transaction:{
      envelopeType: EnvelopeType;
      _fee: string;
      _memo: Memo;
      _networkPassphrase: string;
      _operations: Array<operations>; // Replace 'any' with a specific type if known
      _sequence: string;
      _signatures: Array<any>; // Replace 'any' with a specific type if known
      _source: string;
      _timeBounds: TimeBounds;
      _tx: any; // Define a more specific type if the structure is known
      extraSigners?: Array<any>; // Optional
      fee?: string; // Optional
      ledgerBounds?: any; // Optional, define if structure is known
      memo?: string; // Optional
      minAccountSequence?: string; // Optional
      minAccountSequenceAge?: string; // Optional
      minAccountSequenceLedgerGap?: string; // Optional
      networkPassphrase?: string; // Optional
      operations?: Array<any>; // Optional, define if structure is known
      sequence?: string; // Optional
      signatures?: Array<any>; // Optional, define if structure is known
      source?: string; // Optional
      timeBounds?: TimeBounds; // Optional
      tx?: any;
    }
    getAllTransactions: () => void;
}

const VoteModal = ({isOpen, onClose, proposalId, transaction, getAllTransactions}: VoteModalProps) => {

    const user = useSelector((state: {publicKey:string}) => state)

    const [isVoting, setIsVoting] = useState(false)

    console.log(transaction)

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
          width: '650px',
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
        getAllTransactions()
        } catch (error:any) {
            toast.error(error?.message || error?.response.data)
            setIsVoting(false)
        }
      }


      //@ts-ignore
      console.log(transaction)


  return (
   <ReactModal isOpen ={isOpen} style={customStyles}>
    <div className='flex flex-col justify-center items-center py-[30px]'>

      <div className='flex flex-row gap-[30px] justify-between mb-[10px] w-full lg:px-[40px] text-center items-center'>
        <h1 className='text-2xl font-bold'>Vote this Project For Just {transaction?._operations[0]?.amount} XLM</h1>
        <span><FaTimes className='cursor-pointer' onClick={onClose} /></span>
      </div>

      <div className='px-[30px] flex flex-col'>
        <p className='inline-flex flex-col'>
        <span className='font-bold'>Transaction Type:</span>
        <span className='capitalize'>{transaction?._operations[0]?.type}</span> 
        </p>
        <p className='inline-flex flex-col'>
        <span className='font-bold'> Amount: </span> 
        <span>{transaction?._operations[0]?.amount} XLM</span>
        </p>
        <p className='inline-flex flex-col'>
          <span className='font-bold'>Destination: </span>
          <span>{transaction?._operations[0]?.destination}</span>
          </p>
        <p className='inline-flex flex-col'>
          <span className='font-bold'>Memo: </span>
          <span className='capitalize'>{transaction?._memo?._value}</span>
          </p>
      </div>

      <button onClick={() => handleSubmit(transaction)} className='bg-green-200 hover:bg-green-600 focus:bg-green-700 focus:outline-none px-[8px] py-[10px] hover:text-white rounded-[10px]'>{isVoting ? "Please Wait..." : "Vote"} </button>

      </div>
    </ReactModal>
  )
}

export default VoteModal