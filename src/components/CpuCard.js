import React from 'react'
import { useQuery } from 'urql'
import gql from 'graphql-tag'
// eslint-disable-next-line
import styled from 'styled-components/macro'

import Card from './Card'
import cpuchip from '../images/cpu_chip.svg'

const query = gql`
  {
    getAllData(id: "f452a583-6e9f-4d5a-9eda-b8b21356e68a") {
      cpu {
        manufacturer
        brand
        vendor
        family
        stepping
        revision
        voltage
        speed
        speedmin
        speedmax
      }
    }
  }
`

function CpuCard() {
  const [res, executeQuery] = useQuery({ query })

  const getContent = () => {
    if (res.fetching || res.data === undefined) {
      return <div>Loading..</div>
    }

    if (res.error) {
      return <div>Oh no! Something went wrong!</div>
    }
    const { manufacturer, brand, family } = res.data.getAllData.cpu
    return (
      <Card>
        <div
          css={`
            text-align: center;
          `}
        >
          <img height="100" src={cpuchip} alt="CPU Chip" />
          <h3>
            {manufacturer} {brand}
          </h3>
        </div>
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr;
          `}
        >
          <p>manufacturer</p>
          <p>{manufacturer}</p>
          <p>brand</p>
          <p>{brand}</p>
          <p>family</p>
          <p>{family}</p>
        </div>
      </Card>
    )
  }
  return getContent()
}

export default CpuCard
