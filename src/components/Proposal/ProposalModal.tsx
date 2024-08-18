import React, { Dispatch } from 'react'
import { FaTimes } from 'react-icons/fa'
import ReactModal from 'react-modal'
import CustomInput from '../CustomInput/CustomInput';
import { Dropdown } from 'primereact/dropdown';

interface ProposeModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit : (event: {    preventDefault: () => void;}) => Promise<void>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    deadline: string;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    amountOptions : {label:string; value: number}[];
    minuteOptions: {label:string; value: number}[];
    selectedAmount : number;
    selectedDeadlineMinute : number;
    handleChangeAmount : (e:any) => void;
    handleChange: (e:any) => void
}

const ProposalModal = ({isOpen, onClose, handleSubmit, title, setTitle, amountOptions, description, setDescription, minuteOptions, selectedDeadlineMinute, handleChange, handleChangeAmount, selectedAmount}: ProposeModalProps) => {

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
          width: '600px',
          height: 'auto',
          borderRadius: '10px',
          border: '0.01px solid #888',
        },
        overlay: {
          zIndex: '99',
          backgroundColor: 'rgba(6, 24, 2, 0.55)',
        },
      }

  return (
    <ReactModal isOpen ={isOpen} style={customStyles}>
    <div className='flex flex-col justify-center items-center py-[30px]'>

      <div className='flex flex-row gap-[30px] justify-between mb-[10px] w-full lg:px-[40px] text-center items-center'>
        <h1 className='text-2xl font-bold'>Propose a Project</h1>
        <span><FaTimes className='cursor-pointer' onClick={onClose} /></span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-[30px]'>
          <div>
          <CustomInput value={title} setValue={setTitle} styles='block text-sm font-medium text-gray-700 min-w-[450px] py-[6px] px-[6px]' label='Title of the Project'/>
        </div>
        <div>
          <CustomInput value={description} setValue={setDescription} styles='block text-sm font-medium text-gray-700 min-w-[450px] py-[6px] px-[6px]' label='Description'/>
        </div>
        <div className='flex flex-col'>
        <label>Amount to fund the Project</label>
        <Dropdown
              options={amountOptions} 
              value={selectedAmount} 
              onChange={handleChangeAmount} 
              placeholder="Select Amount" 
              max={1}
              className='min-w-[450px] ring-blue-200 hover:ring-blue-600 ring-2 text-[8px]'
              maxLength={1}
          />
        </div>

        <div className='flex flex-col'>
          <label>Deadline</label>
        <Dropdown
              options={minuteOptions} 
              value={selectedDeadlineMinute} 
              onChange={handleChange} 
              placeholder="Select Minutes" 
              max={1}
              className='min-w-[450px] ring-blue-200 hover:ring-blue-600 ring-2'
              maxLength={1}
          />
        </div>
        <div className='pt-[10px]'>
          <button className='duration-800 border-black border-dotted border-[1px] py-[6px] hover:border-[2px] w-full hover:scale-105 transition ease-in hover:ease-in-out shadow-sm hover:focus:outline-none hover:focus:ring-blue-400'>Create</button>
        </div>
        </div>
        
    </form>

      </div>
  </ReactModal>
  )
}

export default ProposalModal