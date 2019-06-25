import React from 'react'
// eslint-disable-next-line
import styled from 'styled-components/macro'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'
import { primary } from 'insite-ui'
import { device } from '../constants/devices'

const ResponsiveBottomSheet = styled.div`
  display: none;
  @media ${device.tabletS} {
    display: initial;
  }
`

function BottomSheet({ children }) {
  return (
    <ResponsiveBottomSheet>
      <SwipeableBottomSheet overflowHeight={52} shadowTip={false}>
        <div style={{ height: '52px', marginBottom: '12px' }}>
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              padding: '12px',
            }}
          >
            <div
              style={{
                background: '#ccc9c9',
                width: '64px',
                padding: '4px',
                borderRadius: '8px',
              }}
            />
          </div>
        </div>
        <div
          style={{ overflowY: 'scroll', height: '50vh', background: primary }}
        >
          {children}
        </div>
      </SwipeableBottomSheet>
    </ResponsiveBottomSheet>
  )
}

export default BottomSheet
