import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'urql'
// eslint-disable-next-line
import styled from 'styled-components/macro'

import Card from './Card'
import Progress from './Progress'
import memorySvg from '../images/memory_card.svg'

const memoryQuery = gql`
  {
    getAllData(id: "f452a583-6e9f-4d5a-9eda-b8b21356e68a") {
      memory {
        id
        timestamp
        total
        free
        used
        use
        active
        swapused
        swaptotal
        swapfree
        swappercent
      }
    }
  }
`
const toGB = bytes => (bytes / 1000000000).toFixed(2)

function MemoryCard() {
  const [res, executeQuery] = useQuery({ query: memoryQuery })

  const getContent = () => {
    if (res.fetching || res.data === undefined) {
      return <div>Loading..</div>
    }

    if (res.error) {
      return <div>Oh no! Something went wrong!</div>
    }
    const { total, use, swappercent } = res.data.getAllData.memory
    return (
      <Card>
        <div
          css={`
            padding-bottom: 10px;
          `}
        >
          <h3>Memory</h3>
          <hr />
        </div>
        <div
          css={`
            text-align: center;
          `}
        >
          <img
            height="100"
            css={`
              margin: 0 auto;
            `}
            src={memorySvg}
            alt="memory card"
          />
          <h3>Total Memory</h3>
          <h4>{toGB(total)} GB</h4>
        </div>
        <div
          css={`
            color: #727272;
            font-size: 14px;
          `}
        >
          <div>
            <p>Used</p>
            <Progress width={use}>{use}%</Progress>
          </div>
          <div>
            <p>Active</p>
            <Progress width={use}>{use}%</Progress>
          </div>
          <div>
            <p>Swap</p>
            <Progress width={swappercent}>{swappercent}%</Progress>
          </div>
        </div>
      </Card>
    )
  }
  return <div>{getContent()}</div>
}

export default MemoryCard
