import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  return <>Hi</>
}

// Bureau Dashboard:
// has links to run different actions
// has a record of most recent actions

// Lender Dashboard:
// has links to run different actions
// has a record of most recent actions

// User Dashboard:
// Shows credit score
// Shows link to view credit report