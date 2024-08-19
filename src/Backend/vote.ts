import axios from "axios"
import toast from "react-hot-toast"

export const BASE_URL = "https://stellar-backend-ud86.onrender.com/api/v1/vote"

interface Proposal {
    proposalId:number,
    voter: string,
    transactionId:string,
    amount: number,
}

export const submitVote = async ({voter, proposalId, amount, transactionId}: Proposal) => {
    const data = {
        proposalId,
        voter,
        transactionId,
        amount,
    }
    try {
     const response = await axios.post(`${BASE_URL}/vote`, data)
     return response.data
    } catch (error: any) {
        console.log(error)
        return error.message || error.response.data
    }
  }