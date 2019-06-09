import React from 'react'
// eslint-disable-next-line
import styled from 'styled-components/macro'

function Card({ children }) {
  return (
    <div
      css={`
        border-radius: 3px;
        background: white;
        padding: 20px;
      `}
    >
      {children}
    </div>
  )
}

export default Card
