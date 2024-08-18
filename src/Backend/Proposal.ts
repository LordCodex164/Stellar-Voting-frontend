import axios from "axios"

export const BASE_URL = "http://localhost:5000/api/v1/proposal"

interface Proposal {
    title:string,
    publicKey:string,
    description:string,
    amount:number,
    deadlineMinutes: number,
  }


  const createProposal = async ({title, publicKey, description, amount, deadlineMinutes}: Proposal) => {
    const data = {
        title,
        description,
        amount,
        publicKey,
        deadlineMinutes,
    }
    try {
     const response = await axios.post(`${BASE_URL}/create`, data)
     return response.data
    } catch (error: any) {
        console.log(error)
        return error.message || error.response.data
    }
  }

  const getProposal = async (id:number) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      
    }
  }

  const getAllProposal = async () => {
    try {
      
    } catch (error) {
      
    }
  }



  export {
    createProposal
  }