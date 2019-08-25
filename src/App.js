import React from 'react'
import Sidebar from './components/Sidebar'
import { Router, Link } from '@reach/router'
// eslint-disable-next-line
import styled from 'styled-components/macro'

import Home from './Home'
import { Provider } from './context'
import ClientMenu from './components/ClientMenu'
import Default from './components/Default'
import CpuCard from './components/CpuCard'
import MemoryCard from './components/MemoryCard'
import { device } from './constants/devices'
import BottomSheet from './components/BottomSheet'

const ResponsiveDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;

  @media ${device.tabletS} {
    grid-template-columns: 5fr;
  }
`

function Dashboard({ clientId }) {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 20px;
        overflow-y: scroll;
        overflow-x: hidden;
      `}
    >
      <CpuCard clientId={clientId} />
      <MemoryCard clientId={clientId} />
    </div>
  )
}
function App() {
  return (
    <Provider>
      <div
        className="App"
        css={`
          overflow: hidden;
        `}
      >
        <header className="App-header" />
        <ResponsiveDashboard>
          <Sidebar name="insite">
            <h4>Clients</h4>
            <ClientMenu />
            <Link to="/settings">Settings</Link>
          </Sidebar>
          <BottomSheet>
            <h4 style={{ color: 'white', textAlign: 'center' }}>Clients</h4>
            <ClientMenu />
            <Link to="/settings">Settings</Link>
            <Link to="/login">Log In</Link>
          </BottomSheet>
          <Router>
            <Home path="/">
              <Default path="/" />
              <Dashboard path="/:clientId" />
            </Home>
          </Router>
        </ResponsiveDashboard>
      </div>
    </Provider>
  )
}

export default App
