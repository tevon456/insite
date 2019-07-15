import React from 'react'
import devices from '../images/devices.svg'
// eslint-disable-next-line
import styled from 'styled-components/macro'

function Default() {
  return (
    <div
      css={`
        margin: 0 auto;
        text-align: center;
      `}
    >
      <img height="300" src={devices} alt="devices" />
      <h3
        css={`
          opacity: 0.5;
        `}
      >
        Choose a Client to begin
      </h3>
    </div>
  )
}
export default Default
