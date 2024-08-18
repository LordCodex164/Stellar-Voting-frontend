import { fetchAccount } from "../../lib/stellar"
import { useSelector } from "react-redux"

const BalancePage = () => {

    const state =  useSelector((state:any) => state)

    

  return (
    <div>
        BalancePage
    </div>
  )
}

export default BalancePage