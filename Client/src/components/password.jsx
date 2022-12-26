import React, { useContext,useEffect } from 'react'
import RowItemSingle from './rowItemSingle'
import PageContent from './pageContent'
import UserContext from '../utils/walletContext.js'
import RowItemCustom from './rowItemCustom'

export default function Password() {
    const { state, dispatch } = useContext(UserContext)
    const validateAndExecute = (e) => {
        e.preventDefault()
        let p = { name: e.target.name.value, password: e.target.password.value }
        if (state.accessBy === 1)
            p = { ...p, pk: e.target.privateKey.value }
        else if (state.accessBy === 2)
            p = { ...p, mnemonic: e.target.mnemonic.value }       
        dispatch({ type: 'EX_WALLET', param: p })
    }

    useEffect(()=>{        
        dispatch({ type: 'ACCESS', param: 0 })
        Array.from(document.querySelector('form').elements).forEach(i=>i.value='')
    },[])

    useEffect(()=>{
        if(state.error.er){
            setTimeout(()=>{
                dispatch({ type: 'ERROR_CLEAR' })
            },5000)
        }
    },[state.error])

    return <PageContent title="Access existing account">
        <form onSubmit={e => validateAndExecute(e)}>
            <RowItemSingle cl="mt-10">
                <button type='button' className={'button mr-10 ' + (state.accessBy !== 0 ? 'button-outline' : '')} onClick={() => dispatch({ type: 'ACCESS', param: 0 })}>by Password</button>
                <button type='button' className={'button mr-10 ' + (state.accessBy !== 1 ? 'button-outline' : '')} onClick={() => dispatch({ type: 'ACCESS', param: 1 })}>By Private Key</button>
                <button type='button' className={'button ' + (state.accessBy !== 2 ? 'button-outline' : '')} onClick={() => dispatch({ type: 'ACCESS', param: 2 })}>By Seed Words</button>
            </RowItemSingle>
            <RowItemSingle cl={state.accessBy !== 1 ? 'd-none' : 'd-block'}>
                <legend>Account private key</legend>
                <input type="text" placeholder="enter the private key" name="privateKey" required={state.accessBy===1}/>
            </RowItemSingle>
            <RowItemSingle cl={state.accessBy !== 2 ? 'd-none' : 'd-block'}>
                <legend>Seed words (12)</legend>
                <input type="text" placeholder="enter the seed words" name="mnemonic" required={state.accessBy===2}/>
            </RowItemSingle>
            <RowItemCustom>
                <div className="column column-50">
                    <legend>Account password</legend>
                    <input type="password" placeholder="enter the password" name="password" required/>
                </div>
                <div className={'column column-50'}> 
                    <legend>Account name</legend>
                    <input type="text" placeholder="enter a nick name for this account" name="name" required/>
                </div>
            </RowItemCustom>
            <RowItemSingle cl="mt-10">
                <button type='submit' className='button mr-10'>Enter Account</button>
                <button type='button' className='button' onClick={() => dispatch({ type: 'PAGE', param: 'home' })}>Cancel</button>
                <span className='text-danger ml-20'>{state.error.msg}</span>
            </RowItemSingle>
        </form>
    </PageContent>
}