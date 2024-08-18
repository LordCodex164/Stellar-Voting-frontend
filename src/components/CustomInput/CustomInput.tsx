import React from 'react'

interface CustomInputProps {
    label:string;
    styles: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

const CustomInput = ({label, styles, setValue, value}: CustomInputProps) => {

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700' htmlFor="title">{label}</label>
      <input onChange={(e) => setValue(e.target.value)} value={value} className={`form-input transition duration-300 ease-in-out border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 ${styles}`}/>
    </div>
  )
}

export default CustomInput