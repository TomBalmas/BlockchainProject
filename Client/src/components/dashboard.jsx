import React, { useContext, useEffect } from 'react'
import RowItemSingle from './rowItemSingle'
import PageContent from './pageContent'
import UserContext from '../utils/walletContext.js'
import Transactions from './transactions'
import * as Lib from '../utils/lib'
import { getBalance, getPrice, getTransactions } from '../utils/backgroundWorker'

export default function Dashboard() {
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        getBalance(state, dispatch)
        getPrice(state, dispatch)
        getTransactions(state, dispatch)
        // TBD - tracking balance, price and transactions updates
    }, [])

    return (
        <PageContent title="My Wallet account">

            <RowItemSingle>
                <div className="float-left mr-10">Address: </div>
                <div className="float-left font-bold text-primary">{state.address}</div>
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Balance: </div>
                <div className="float-left font-bold text-primary mr-10">{state.balance} ETH</div>
                {/* <div className="float-left">Goerli ETH</div> */}
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">ETH Price: </div>
                <div className="float-left font-bold text-primary mr-10">{state.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}</div>
                {/* <div className="float-left">USD</div> */}
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Account cost:</div>
                <div className="float-left font-bold text-primary mr-10"> {(state.price * state.balance).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}</div>
                {/* <div className="float-left">USD</div> */}
            </RowItemSingle>
            <RowItemSingle cl="mt-10">
                <button className='button mr-10' onClick={() => dispatch({ type: 'PAGE', param: 'transaction' })}>New Transaction</button>
                <button className='button' onClick={() => dispatch({ type: 'PAGE', param: 'home' })}>Exit Wallet</button>
                <span className='text-danger ml-20'>{state.error.msg}</span>
            </RowItemSingle>
            <RowItemSingle>
                <legend>Last transactions</legend>
                <Transactions />
            </RowItemSingle>
            <RowItemSingle>
                <div><a href={Lib.etherscanUrlAcc(state.network, state.address)}
                    rel="noopener noreferrer" target='_blank'>See the account in block explorer</a></div>
            </RowItemSingle>
        </PageContent>
    )
}