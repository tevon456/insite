import React from 'react'
import { primary, secondary, textForeground } from 'insite-ui'
// eslint-disable-next-line
import styled from 'styled-components/macro'

class Sidebar extends React.Component {
  render() {
    return (
      <div
        css={`
          position: sticky;
          height: 100vh;
          color: ${textForeground};
          border: none;
          background: ${secondary};
          &:focus {
            border: none;
            outline: none;
          }
        `}
      >
        <div
          css={`
            background: ${primary};
            padding: 3px;
            text-align: center;
          `}
        >
          <h1
            css={`
              font-family: Pridi;
              font-weight: 400;
              font-size: 40px;
              letter-spacing: 1px;
            `}
          >
            insite
          </h1>
        </div>
        <div
          css={`
            display: grid;
            grid-template-rows: 50px 5fr 1fr;
            margin: 0 auto;
            text-align: center;
            font-family: Lato, san-serif;
          `}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Sidebar
