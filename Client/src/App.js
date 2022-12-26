import './Miligram.css'
import React,{useReducer} from 'react'
import {initState, reducer } from './utils/walletReducer'
import UserContext from './utils/walletContext'
import CreateNew from './components/createNew'
import Dashboard from './components/dashboard'
import Home from './components/home'
import NewCreated from './components/newCreated'
import NewTransaction from './components/newTransaction'
import ConfirmTransaction from './components/confirmTransaction'
import Password from './components/password'
//import {BackgroundWorker} from './utils/backgroundWorker'

function App() {
  const pages = {
    'home': <Home />, 
    'new': <CreateNew />,
    'created': <NewCreated />,
    'dashboard':<Dashboard />,
    'transaction':<NewTransaction/>,
    'confirm':<ConfirmTransaction/>,
    'password': <Password/>
  }

  const [state, dispatch] = useReducer(reducer,initState)
  //BackgroundWorker(state,dispatch)

  return (
    <UserContext.Provider value={{state, dispatch}}>
    <div className="App container">
        <h1>ETR BTC DOG Wallet</h1>
          {pages[state.page]}
    </div>
    </UserContext.Provider>
  )
}

export default App
