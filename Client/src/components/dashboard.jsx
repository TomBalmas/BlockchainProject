import React, { useContext, useEffect } from 'react'
import RowItemSingle from './rowItemSingle'
import PageContent from './pageContent'
import  {  useState  } from "react";
import UserContext from '../utils/walletContext.js'
import Transactions from './transactions'
import * as Lib from '../utils/lib'
import { getBalance, getPrice, getTransactions } from '../utils/backgroundWorker'
import{bitcoinAddress,checkBalance,getBtcPrice} from '../utils/walletBTC.js'
import{dogecoinAddress,checkDODGEPrice, checkDOGEBalance} from '../utils/walletDOGE.js'
export default function Dashboard() {
    const { state, dispatch } = useContext(UserContext)
    const [btcBalance, setBTCBalance] = useState(""); 
    const [dogBalance, setDOGBalance] = useState(""); 
    const [btcPrice, setPrice] = useState(""); 
    const [DogePrice, DogesetPrice] = useState(""); 
    

    //check BTC balance
    const promise = new Promise((resolve, reject) => {
        resolve( checkBalance() )  })
        promise.then((response) => {
        setBTCBalance(response)
      })
    //get current BTC price in USD
    async function getbtcPrice() {
    try { 
        const promise = new Promise((resolve, reject) => {
        resolve(getBtcPrice() )
        })  
        promise.then((response) => {
        setPrice(response)
      })
      } catch (error) {} 
  }
  //gru DOGE price in USD
  async function getDOGEPrice() {
    try { 
        const promise = new Promise((resolve, reject) => {
        resolve(checkDODGEPrice() )  })  
        promise.then((response) => {
            DogesetPrice(response)
        })
      } catch (error) {} 
    }
    async function getDOGEBalance() {
    try { 
        const promise = new Promise((resolve, reject) => {
        resolve(checkDOGEBalance() )
        })  
        promise.then((response) => {
        setDOGBalance(response)
        })
        } catch (error) {} 
    }
    useEffect(() => {
        getbtcPrice()
        getDOGEPrice()
        getDOGEBalance()
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
                <button className='button mr-10' onClick={() => dispatch({ type: 'PAGE', param: 'ETCtransaction' })}>New Transaction</button>
                <span className='text-danger ml-20'>{state.error.msg}</span>
            </RowItemSingle>
            <RowItemSingle>
                <div><a href={Lib.etherscanUrlAcc(state.network, state.address)}
                    rel="noopener noreferrer" target='_blank'>See the Etherium account in block explorer</a></div>
            </RowItemSingle>
            <div class="header">
            <h1>Bitcoin :</h1>
            </div>
            <RowItemSingle>
                <div className="float-left mr-10">Address: </div>
                <div className="float-left font-bold text-primary">{state.BTCaddress}</div>
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Balance: </div>
                <div className="float-left font-bold text-primary mr-10">{btcBalance} BTC</div>
                {/* <div className="float-left">Goerli ETH</div> */}
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">BTC Price: </div>
                <div className="float-left font-bold text-primary mr-10">{btcPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}</div>
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
                <button className='button mr-10' onClick={() => dispatch({ type: 'PAGE', param: 'BTCtransaction' })}>New Transaction</button>
                <span className='text-danger ml-20'>{state.error.msg}</span>
            </RowItemSingle>
            <RowItemSingle>
                <div><a href={Lib.btcscanUrlAcc( state.BTCaddress)}
                    rel="noopener noreferrer" target='_blank'>See the Bitcoin account in block explorer</a></div>
            </RowItemSingle>
            <div class="header">
            <h1>Dodgecoin :</h1>
            </div>
            <RowItemSingle>
                <div className="float-left mr-10">Address: </div>
                <div className="float-left font-bold text-primary">{state.DOGEaddress}</div>
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
                <button className='button mr-10' onClick={() => dispatch({ type: 'PAGE', param: 'DOGEtransaction' })}>New Transaction</button>
                <span className='text-danger ml-20'>{state.error.msg}</span>
            </RowItemSingle>
            <RowItemSingle>
                <legend>Last transactions</legend>
                <Transactions />
            </RowItemSingle>
            <RowItemSingle>
                <div><a href={Lib.dogescanUrlAcc(state.DOGEaddress)}
                    rel="noopener noreferrer" target='_blank'>See the DOGE-Coin account in block explorer</a></div>
            </RowItemSingle>
            <RowItemSingle>
                <button className='button' onClick={() => dispatch({ type: 'PAGE', param: 'home' })}>Exit Wallet</button>
            </RowItemSingle>
        </PageContent>
    )
}