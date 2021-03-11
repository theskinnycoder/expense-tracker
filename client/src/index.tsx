import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.querySelector("#root")
)
