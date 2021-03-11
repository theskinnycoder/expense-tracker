import { FC } from "react"
import { TransactionsProp } from "../App"
import TransactionItem from "./TransactionItem"

// A Functional Component to render a list of TransactionItems
const TransactionList: FC<TransactionsProp> = ({ transactions }) => {
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(({ id, amount, text }) => (
          <TransactionItem key={id} id={id} amount={amount} text={text} />
        ))}
      </ul>
    </>
  )
}

export default TransactionList
