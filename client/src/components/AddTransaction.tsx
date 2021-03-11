import { SyntheticEvent, useRef, useState } from "react"
import {
  GetTransactionsDocument,
  GetTransactionsQuery,
  useCreateTransactionMutation
} from "../generated/graphql"

// A Functional Component to Add a Transaction
const AddTransaction = () => {
  // Local States and references for Form Values
  const [text, setText] = useState<string>("")
  const [amount, setAmount] = useState<string>("0")
  const textRef = useRef(null)

  // Use the Generated useCreateTransactionMutation Hook
  const [CreateTransaction, { loading, error }] = useCreateTransactionMutation()

  // Run the CreateTransaction Mutation and Update the Cache
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault()

    CreateTransaction({
      variables: { text, amount: +amount },

      // Updating the Cache
      update: (cache, { data: { newTransaction } }) => {
        // First read the initial cache
        const { allTransactions } = cache.readQuery<GetTransactionsQuery>({
          query: GetTransactionsDocument
        })

        // Then add the created trasaction into the existing cache
        if (allTransactions && newTransaction) {
          cache.writeQuery<GetTransactionsQuery>({
            query: GetTransactionsDocument,
            data: {
              allTransactions: [...allTransactions, newTransaction]
            }
          })
        }
      }
    })

    // Form & AutoFocus Reset
    setText("")
    setAmount("0")
    textRef.current.focus()
  }

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            ref={textRef}
            type="text"
            onChange={e => setText(e.target.value)}
            placeholder="Enter text..."
            autoFocus
            value={text}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="text"
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount..."
            value={amount.toString()}
            required
          />
        </div>
        <button type="submit" className="btn">
          Add transaction
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error...</p>}
      </form>
    </>
  )
}

export default AddTransaction
