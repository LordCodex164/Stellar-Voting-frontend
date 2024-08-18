import { useEffect, useState } from "react"
import { fetchAccount, fetchRecentPayments } from "../../lib/stellar"
import { useSelector } from "react-redux"
import toast from "react-hot-toast";



const BalancePage = () => {

    const [balance, setBalance] = useState('0');
    const [recentTransactions, setRecentTransactions] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const state = useSelector((state: {keyId: string, devInfo:string | null, publicKey:string}) => state)
    const sharedAccountId = state.publicKey;
    
    const handleFetchAccount = async () => {
        setIsLoading(true)
        try {
           const account = await fetchAccount(sharedAccountId)
           const transactions = await fetchRecentPayments(sharedAccountId)
           setRecentTransactions(transactions)
           console.log(account)
           console.log(transactions)
           setIsLoading(false)
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
      handleFetchAccount()
    },[])

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6 text-center">Account Information</h1>
    
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Community Pool Balance</h2>
      <p className="text-xl mb-2">Current Balance: <span className="font-bold">{balance} XLM</span></p>
      <p className="text-gray-600">Your account balance reflects your current holdings in the community pool.</p>
    </div>

  </div>
  )
}

export default BalancePage