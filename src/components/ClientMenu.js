import React, { useCallback } from 'react'
import { useQuery } from 'urql'
import { Link } from '@reach/router'
import gql from 'graphql-tag'
// eslint-disable-next-line
import styled from 'styled-components/macro'

const clientsQuery = gql`
  {
    getAllClients {
      id
      lastTimestamp
    }
  }
`
function ClientMenu() {
  const [res, executeQuery] = useQuery({ query: clientsQuery })

  const refetch = useCallback(
    () => executeQuery({ requestPolicy: 'network-only' }),
    [executeQuery]
  )

  const getContent = () => {
    if (res.fetching || res.data === undefined) {
      return <div>Loading..</div>
    }

    if (res.error) {
      return <div>Oh no! Something went wrong!</div>
    }
    return (
      <ul
        css={`
          list-style: none;
          padding: 0;
        `}
      >
        {res.data.getAllClients.map(({ id }) => (
          <Link
            key={id}
            to={id}
            css={`
              color: white;
            `}
          >
            {id}
          </Link>
        ))}
      </ul>
    )
  }

  return <div>{getContent()}</div>
}
export default ClientMenu
