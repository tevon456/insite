import React from 'react'
// eslint-disable-next-line
import styled from 'styled-components/macro'
import { background } from 'insite-ui'

function Home({ children }) {
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

      {children}
    </div>
  )
}

export default Home
