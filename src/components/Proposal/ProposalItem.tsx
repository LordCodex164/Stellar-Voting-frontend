import { useEffect, useState } from 'react'

interface ProposalItemProps {
    proposal:{
     _id: number,
    title: string,
    description: string,
    amount:string,
    status: string,
    publicKey:string,
    deadline: number,
    },
    isVoting?:boolean,
    disabled?:boolean,
    handleVote?: (proposalId:number, publicKey: string) => Promise<void>,

}

const ProposalItem = ({proposal, isVoting, handleVote}: ProposalItemProps) => {
   
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
    {isVoting && <button onClick={() => handleVote && handleVote(proposal._id, proposal.publicKey)} className={`${proposal.status !== "expired" ? "duration-700 shadow-md transition-all scale-75 active:scale-100  hover:scale-90 max-w-[100px] ring-black ring-[0.1em] focus:border-dotted focus:border-[2px] focus:border-black hover:ring-blue-700 hover:animate-pulse px-[10px] py-[7px]" : "text-gray-300 border-[2px] border-gray-300"}`}>
    Vote</button>}
  </div>
  )
}

export default ProposalItem