import { Field, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

// Transaction PostgreSQL Table and GraphQL ObjectType
@ObjectType()
@Entity({ name: "transaction" })
export default class Transaction extends BaseEntity {
  // UUID Primary Key Field
  @Field(() => ID!)
  @PrimaryGeneratedColumn("uuid")
  id!: number

  // Text Field for the description of the transaction
  @Field({ nullable: false })
  @Column()
  text!: string

  // Number Field for the transaction defaulting to 0
  @Field({ defaultValue: 0 })
  @Column("float")
  amount!: number
}
