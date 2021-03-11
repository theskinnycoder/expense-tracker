import { FC, FormEventHandler } from "react"
import { Transaction, useDeleteTransactionMutation } from "../generated/graphql"

// A Functional Component for each Transaction
const TransactionItem: FC<Transaction> = ({ id, amount, text }) => {
  // Use the Generated useDeleteTransactionMutation Hook
  const [DeleteTransaction, { loading, error }] = useDeleteTransactionMutation()

  // Run the DeleteTransaction Mutation and Update the Cache
  const deleteHandler: FormEventHandler = () => {
    DeleteTransaction({
      variables: { id },

      // Updating the Cache
      update: cache => {
        // The Evict Function takes in the ID of the Object-Type to remove
        cache.evict({ id: `Transaction:${id}` })
      }
    })
  }

  const sign = amount < 0 ? "-" : "+"

  return (
    <li className={amount < 0 ? "minus" : "plus"}>
      {text}{" "}
      <span>
        {sign}${Math.abs(amount)}
      </span>
      <button className="delete-btn" onClick={deleteHandler}>
        x
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
    </li>
  )
}

export default TransactionItem
