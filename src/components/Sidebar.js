import React from 'react'
import { primary, secondary, textForeground } from 'insite-ui'
// eslint-disable-next-line
import styled from 'styled-components/macro'
import { device } from '../constants/devices'

const ResponsiveSideBar = styled.div`
  @media ${device.tabletS} {
    display: none;
  }
`
function Sidebar(props) {
  return (
    <ResponsiveSideBar
      css={`
        min-width: 158px;
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
          {props.name}
        </h1>
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: 80px 5fr 1fr;
          padding: 20px;
          margin: 0 auto;
          text-align: center;
          font-family: Lato, san-serif;
        `}
      >
        {props.children}
      </div>
    </ResponsiveSideBar>
  )
}

export default Sidebar
