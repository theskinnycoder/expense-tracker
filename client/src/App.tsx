import { FC } from "react"
import "./App.css"
import AddTransaction from "./components/AddTransaction"
import Balance from "./components/Balance"
import Header from "./components/Header"
import IncomeExpenses from "./components/IncomeExpenses"
import TransactionList from "./components/TransactionList"
import { Transaction, useGetTransactionsQuery } from "./generated/graphql"

// Global PropTypes for all children components
export interface TransactionsProp {
  transactions: Transaction[]
}

// The Base Functional Component
const App: FC = () => {
  // Use the Generated useGetTransactionsQuery Hook
  const { data, loading, error } = useGetTransactionsQuery()

  if (loading) return <p>Loading</p>
  if (error) return <p>Error</p>
  return (
    <div>
      <Header />
      <div className="container">
        <Balance transactions={data?.allTransactions} />
        <IncomeExpenses transactions={data?.allTransactions} />
        <TransactionList transactions={data?.allTransactions} />
        <AddTransaction />
      </div>
    </div>
  )
}

export default App
