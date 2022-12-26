import React, { useContext, useEffect } from 'react'
import RowItemSingle from './rowItemSingle'
import RowItemCustom from './rowItemCustom'
import PageContent from './pageContent'
import UserContext from '../utils/walletContext.js'

export default function NewTransaction() {
    const { state,dispatch } = useContext(UserContext)

    useEffect(() => {
        Array.from(document.querySelector('form').elements).forEach(i => i.value = '')
        dispatch({type: 'NEW_TRANSACTION_CLEAR'})
    }, [])

    const validateAndExecute = (e) => {
        e.preventDefault()       
        if(e.target.amount.value < state.balance){
            dispatch({type: 'SET_NEW_TRANSACTION',param:{recepient: e.target.recepient.value, amount: e.target.amount.value }})
        }else{
            dispatch({ type: 'SET_ERROR', param: 'amount can\'t exceed the balance' })
        }        
    }

    return <PageContent title="Create new transaction">
        <form onSubmit={e => validateAndExecute(e)}>
            <RowItemCustom>
                <div className="column column-50">
                    <legend>Recepient</legend>
                    <input type="text" placeholder="enter recepient address" name="recepient" required/>
                </div>
                <div className="column column-25">
                    <legend>Amount (ETH)</legend>
                    <input type="number" step="0.00001" placeholder="amount to send" name="amount" required/>
                </div>                
            </RowItemCustom>
            <RowItemSingle cl="mt-10">
                <button type="submit" className='button mr-10'>Create Transaction</button>
                <button type="button" className='button' onClick={() => dispatch({ type: 'PAGE', param: 'dashboard' })}>Cancel</button>
            </RowItemSingle>
        </form>
    </PageContent>
}