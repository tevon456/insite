import React from 'react'
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
          background: #112434;
        `}
      >
        {res.data.getAllClients.map(({ id }) => (
          <li
            css={`
              padding-top: 5px;
              padding: 10px;
            `}
            key={id}
          >
            <Link
              to={id}
              css={`
                text-decoration: none;
                color: #535c6c;
              `}
            >
              {id.substring(0, 8)}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return <div>{getContent()}</div>
}
export default ClientMenu
