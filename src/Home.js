import React from 'react'
// eslint-disable-next-line
import styled from 'styled-components/macro'
import { background } from 'insite-ui'
import MemoryCard from './components/MemoryCard'
import CpuCard from './components/CpuCard'

function Home(props) {
  return (
    <div
      css={`
        background: ${background};
        padding-top: 20px;
        padding-left: 20px;
        height: 100%;
      `}
    >
      <h2>Dashboard</h2>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;
        `}
      >
        <CpuCard />
        <MemoryCard />
      </div>
    </div>
  )
}

export default Home
