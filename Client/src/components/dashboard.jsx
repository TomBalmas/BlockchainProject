import React, { useContext, useEffect } from 'react'
import RowItemSingle from './rowItemSingle'
import PageContent from './pageContent'
import  {  useState  } from "react";
import UserContext from '../utils/walletContext.js'
import Transactions from './transactions'
import * as Lib from '../utils/lib'
import { getBalance, getPrice, getTransactions } from '../utils/backgroundWorker'
import{bitcoinAddress,checkBalance,checkBTCPrice} from '../utils/walletBTC.js'
import{dogecoinAddress,checkDODGEPrice, checkDOGEBalance} from '../utils/walletDOGE.js'
export default function Dashboard() {
    const { state, dispatch } = useContext(UserContext)
    const [btcBalance, setBTCBalance] = useState(""); 
    const [dogBalance, setDOGBalance] = useState(""); 
    const [btcPrice, setPrice] = useState(""); 
    const [DogePrice, DogesetPrice] = useState(""); 

    //check BTC balance
    const promise = new Promise((resolve, reject) => {
        resolve( checkBalance() )
      })
      
      promise.then((response) => {
        setBTCBalance(response)
      })
      //check DODGE BALANCE
      const dodgeBalance = new Promise((resolve, reject) => {
        resolve( checkDOGEBalance() )
      })
      
      dodgeBalance.then((response) => {
        setDOGBalance(response)
      })
      //NOT WORKING-DODGE CURRENT PRICE
    //   const dodgePrice = new Promise((resolve, reject) => {
    //     resolve( checkDODGEPrice() )
    //   })
      
    //   dodgeBalance.then((response) => {
    //     DogesetPrice(response)
    //   })
      //no
      //not working
    //   const checkPrice = new Promise((resolve, reject) => {
    //    // resolve( checkBTCPrice() )
    //   })
      
    //   promise.then((response) => {
    //    // setPrice(response)
    //   })
    useEffect(() => {
        getBalance(state, dispatch)
        getPrice(state, dispatch)
        getTransactions(state, dispatch)
       
        // TBD - tracking balance, price and transactions updates
    }, [])

    return (
        <PageContent title="My coins">
         <div class="header">
            <h1>Etherium :</h1>
            </div>
            <script src="https://unpkg.com/bitcore-lib@latest/dist/bitcore-lib.min.js"></script>
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
            <div class="header">
            <h1>Bitcoin :</h1>
            </div>
            <RowItemSingle>
                <div className="float-left mr-10">Address: </div>
                <div className="float-left font-bold text-primary">{bitcoinAddress}</div>
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Balance: </div>
                <div className="float-left font-bold text-primary mr-10">{btcBalance} BTC</div>
                {/* <div className="float-left">Goerli ETH</div> */}
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">BTC Price: </div>
                <div className="float-left font-bold text-primary mr-10">{btcPrice}</div>
                {/* <div className="float-left">USD</div> */}
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Account cost:</div>
                <div className="float-left font-bold text-primary mr-10"> {(btcPrice * btcBalance).toLocaleString('en-US', {
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
            <div class="header">
            <h1>Dodgecoin :</h1>
            </div>
            <RowItemSingle>
                <div className="float-left mr-10">Address: </div>
                <div className="float-left font-bold text-primary">{dogecoinAddress}</div>
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Balance: </div>
                <div className="float-left font-bold text-primary mr-10">{dogBalance} DOGE</div>
                {/* <div className="float-left">Goerli ETH</div> */}
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">DODGE Price: </div>
                <div className="float-left font-bold text-primary mr-10">{DogePrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}</div>
                {/* <div className="float-left">USD</div> */}
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Account cost:</div>
                <div className="float-left font-bold text-primary mr-10"> {(DogePrice * state.balance).toLocaleString('en-US', {
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