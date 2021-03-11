import { FC } from "react"
import { TransactionsProp } from "../App"

// A React Functional Component to get the total of the incomes & expenses
const Balance: FC<TransactionsProp> = ({ transactions }) => {
  // An array of all transaction amounts
  const amounts = transactions.map(transaction => transaction.amount)

  // Calculate the total
  const total = amounts?.reduce((acc, item) => (acc += item), 0)?.toFixed(2)
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  )
}

export default Balance
