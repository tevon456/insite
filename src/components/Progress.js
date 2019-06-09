import React from 'react'
import { primary, textForeground } from 'insite-ui'
// eslint-disable-next-line
import styled from 'styled-components/macro'

function Progress({ width, children }) {
  return (
    <div
      css={`
        background: ${textForeground};
        text-align: center;
      `}
    >
      <div
        css={`
          border-radius: 10px;
          background: ${primary};
          width: ${width}%;
          color: white;
        `}
      >
        {children}
      </div>
    </div>
  )
}

export default Progress
