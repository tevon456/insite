import React from 'react'
import { createClient, Provider } from 'urql'

const client = createClient({
  url: `http://localhost:8080/graphql`,
})

function InsiteProvider(props) {
  return <Provider value={client}>{props.children}</Provider>
}

export { InsiteProvider as Provider }
