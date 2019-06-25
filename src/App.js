import React from 'react'
import Sidebar from './components/Sidebar'
import { Router, Link } from '@reach/router'
// eslint-disable-next-line
import styled from 'styled-components/macro'

import Home from './Home'
import { Provider } from './context'
import ClientMenu from './components/ClientMenu'
import CpuCard from './components/CpuCard'
import MemoryCard from './components/MemoryCard'
import { device } from './constants/devices'

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
        grid-template-columns: 1fr 1fr;
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
          <Sidebar>
            <h4>Clients</h4>
            <ClientMenu />
            <Link to="/settings">Settings</Link>
            <Link to="/login">Log In</Link>
          </Sidebar>
          <Router>
            <Home path="/">
              <Dashboard path="/:clientId" />
            </Home>
          </Router>
        </ResponsiveDashboard>
      </div>
    </Provider>
  )
}

export default App
