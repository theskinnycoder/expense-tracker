import { FC } from "react"
import { TransactionsProp } from "../App"

// A Functional Component to display both only incomes & only expenses
const IncomeExpenses: FC<TransactionsProp> = ({ transactions }) => {
  // An array of all transaction amounts
  const amounts = transactions.map(transaction => transaction?.amount)

  // Calculate total incomes
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  // Calculate total expenses
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2)

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${expense}</p>
      </div>
    </div>
  )
}

export default IncomeExpenses
