import React, { useEffect, useState } from 'react'

interface ProposalItemProps {
    proposal:{
     _id: number,
    title: string,
    description: string,
    amount:string,
    status: string,
    deadline: number
    }
}

const ProposalItem = ({proposal}: ProposalItemProps) => {
   
    const calculateTimeLeft = () => {
      const pastDate:Date = new Date(proposal.deadline)
      const now:Date = new Date()   
      const difference = pastDate.getTime() - now.getTime();
      const seconds = Math.floor(difference > 0 ? difference / 1000 : 0)
      const minutes = Math.floor(seconds > 0 ? seconds / 60 : 0)
      const hours = Math.floor(minutes > 0 ? minutes / 60 : 0)
      const days = Math.floor(hours > 0 ? hours / 24 : 0)

      return {
        days,
        hours,
        minutes,
        seconds
      }

    }
    const [timeLeft, setTimeLeft] = useState<{seconds: number, minutes: number, hours: number, days: number}>(calculateTimeLeft())

    //

     useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft())
      }, 1000)
      return () => clearInterval(timer)
     }, [])



  return (
    <div key={proposal._id} className="border p-4 rounded shadow">
    <h2 className="text-xl font-bold mb-2">{proposal.title}</h2>
    <p className="mb-2">{proposal.description}</p>
    <p className="mb-2">Amount: {proposal.amount} XLM</p>
    <p className="mb-2">Status: {proposal.status}</p>
    {timeLeft.minutes == 0 && timeLeft.seconds == 0 ?
    <p>Time is Up</p>
     :
     <p>Time left: {timeLeft.minutes} Minutes {timeLeft.seconds} Seconds </p>
    }
    
  </div>
  )
}

export default ProposalItem