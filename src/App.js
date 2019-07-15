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

function Dashboard({ clientId }) {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 20px;
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
      <div className="App">
        <header className="App-header" />
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 5fr;
          `}
        >
          <Sidebar>
            <h4>Clients</h4>
            <ClientMenu />
            <Link to="/settings">Settings</Link>
          </Sidebar>
          <Router>
            <Home path="/">
              <Default path="/" />
              <Dashboard path="/:clientId" />
            </Home>
          </Router>
        </div>
      </div>
    </Provider>
  )
}

export default App
