import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql"
import Transaction from "../entities/Transaction"

// Root Resolver Functions Class
@Resolver()
export default class TransactionResolvers {
  // Get all Transactions
  @Query(() => [Transaction!]!)
  async allTransactions() {
    return await Transaction.find()
  }

  // Create a new Transaction
  @Mutation(() => Transaction!)
  async newTransaction(
    @Arg("text", { nullable: false }) text: string,
    @Arg("amount", () => Int!) amount: number
  ) {
    return await Transaction.create({ text, amount }).save()
  }

  // Delete a Transaction
  @Mutation(() => ID!, { name: "deletedTransaction" })
  async deleteTransaction(@Arg("id", () => ID!) id: number) {
    await Transaction.delete({ id })
    return id
  }
}
