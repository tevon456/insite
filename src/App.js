import React from 'react'
import Sidebar from './components/Sidebar'
import { Router } from '@reach/router'
// eslint-disable-next-line
import styled from 'styled-components/macro'

import Home from './Home'
import { Provider } from './context'
import ClientMenu from './components/ClientMenu'

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
          </Sidebar>
          <Router>
            <Home path="/" />
          </Router>
        </div>
      </div>
    </Provider>
  )
}

export default App
