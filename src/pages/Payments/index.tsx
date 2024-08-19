import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchAccount, fetchRecentPayments } from '../../lib/stellar';
import toast from 'react-hot-toast';

const PaymentPage = () => {

    const [balance, setBalance] = useState('0');
    const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
    const state = useSelector((state: {keyId: string, devInfo:string | null, publicKey:string}) => state)
    const sharedAccountId = state.publicKey;
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFetchAccount = async () => {
      setIsLoading(true)
      try {
         const account = await fetchAccount(sharedAccountId)
         const transactions = await fetchRecentPayments(sharedAccountId)
         //ts-ignore
         setRecentTransactions(transactions)
         console.log(account)
         setBalance(account ? account?.balances[0].balance : "")
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
    <h1 className="text-3xl font-bold mb-6 text-center">Transaction Information</h1>
  
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      <ul className="space-y-2">
        {recentTransactions.map((tx) => (
          <li key={tx.id} className="border p-4 rounded-md hover:shadow-lg transition-shadow">
            <p className="font-medium">Transaction ID: <span className="font-bold">{tx.id}</span></p>
            <p className="text-gray-600">Created At: <span className="font-semibold">{new Date(tx.created_at).toLocaleString()}</span></p>
          </li>
        ))}
      </ul>
      {recentTransactions.length === 0 && (
        <p className="text-gray-500 mt-4">No recent transactions found.</p>
      )}
    </div>
  </div>
  
  )
}

export default PaymentPage