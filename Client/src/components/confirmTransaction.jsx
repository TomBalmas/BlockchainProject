import React, { useContext, useState, useEffect } from 'react'
import RowItemSingle from './rowItemSingle'
import RowItemCustom from './rowItemCustom'
import PageContent from './pageContent'
import UserContext from '../utils/walletContext'
import { transactionFeeEther } from '../utils/walletEthers'
import { transactionFeeBTC } from '../utils/walletBTC'
import { transactionFeeDOGE } from '../utils/walletDOGE'
import * as Acc from '../utils/walletEthers.js'
import * as Bcc from '../utils/walletBTC.js'
import * as Dcc from '../utils/walletDOGE.js'

export default function ConfirmTransaction() {
    const { state, dispatch } = useContext(UserContext)
    const [fee, setFee] = useState({ gasLimit: 0, gasPrice: 0, comUsd: 0, com: 0 })

    useEffect(() => {
        const fetchFee = async () => {
            let f =null
            if(state.newTransaction.coinSymbol=='ETH')
                f = await transactionFeeEther(state.newTransaction.network)
            else if(state.newTransaction.coinSymbol=='BTC')
                f = await transactionFeeBTC()
            else if(state.newTransaction.coinSymbol=='DOGE')
                f = await transactionFeeDOGE(state.newTransaction.network)
            f = { ...f, comUsd: f.com * state.price }
            setFee(f)
        }
        fetchFee()
            .catch((e) => {
                console.log(e)
                dispatch({ type: 'SET_ERROR', param: 'fee data request error' })
            })
    }, [])

    useEffect(() => {
        if (state.error.er) {
            setTimeout(() => {
                dispatch({ type: 'ERROR_CLEAR' })
            }, 5000)
        }
    }, [state.error])

    const validateAndExecute = async (e) => {
        e.preventDefault()
        const wallet = null
        const dec = localStorage[state.name]
        if(state.newTransaction.coinSymbol=='ETH')
            wallet = JSON.parse(Acc.decWallet(dec, e.target.password.value))
        else if(state.newTransaction.coinSymbol=='BTC' || state.newTransaction.coinSymbol=='DOGE')
            wallet = state.hdWallet
       
        console.log(state.network, wallet.privateKey, state.newTransaction.recepient, state.newTransaction.amount.toString())
        try{
            const trh = null
            if(state.newTransaction.coinSymbol=='ETH')
                trh = await Acc.sendTransaction(state.network, wallet.privateKey, state.newTransaction.recepient, state.newTransaction.amount)
            else if(state.newTransaction.coinSymbol=='BTC')
                trh = await Bcc.sendBTC(state.newTransaction.recepient, state.newTransaction.amount, wallet)
            else if(state.newTransaction.coinSymbol=='DOGE')
                trh = await Dcc.sendDoge(state.newTransaction.recepient, state.newTransaction.amount, wallet)
            console.log(trh)
            dispatch({ type: 'PAGE', param: 'dashboard' })
        }catch(e){
            console.log(e)
            dispatch({ type: 'SET_ERROR', param: 'transaction submit error' }) 
        }
    }

    return (
        <PageContent title="Confirm new transaction">
            <form onSubmit={e => validateAndExecute(e)}>
                <RowItemSingle>
                    <div className="float-left mr-10">Recepient: </div>
                    <div className="float-left font-bold">{state.newTransaction.recepient}</div>
                </RowItemSingle>
                <RowItemSingle>
                    <div className="float-left mr-10">Amount: </div>
                    <div className="float-left font-bold">{state.newTransaction.amount} {state.newTransaction.coinSymbol}</div>
                </RowItemSingle>
                <RowItemSingle>
                    <div className="float-left mr-10">Gas Limit: </div>
                    <div className="float-left font-bold">{fee.gasLimit.toLocaleString('en-US')}</div>
                </RowItemSingle>
                <RowItemSingle>
                    <div className="float-left mr-10">Gas Price: </div>
                    <div className="float-left font-bold">{fee.gasPrice.toLocaleString('en-US')} Wei</div>
                </RowItemSingle>
                <RowItemSingle>
                    <div className="float-left mr-10">Transaction fee: </div>
                    <div className="float-left font-bold">{fee.com.toLocaleString('en-US')} {state.newTransaction.coinSymbol} ({fee.comUsd.toLocaleString('en-US')} USD)</div>
                </RowItemSingle>
                <RowItemCustom>
                    <div className="column column-50">
                        <legend>Password</legend>
                        <input type="password" placeholder="enter the password" name="password" required />
                    </div>
                </RowItemCustom>
                <RowItemSingle cl="mt-10">
                    <button type='submit' className='button mr-10'>Confirm</button>
                    <button type='button' className='button' onClick={() => dispatch({ type: 'PAGE', param: 'dashboard' })}>Cancel</button>
                    <span className='text-danger ml-20'>{state.error.msg}</span>
                </RowItemSingle>
            </form>
        </PageContent>
    )
}