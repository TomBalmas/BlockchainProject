import React, { useEffect, useContext } from 'react'
import RowItemSingle from './rowItemSingle'
import RowItemCustom from './rowItemCustom'
import PageContent from './pageContent'
import UserContext from '../utils/walletContext.js'

export default function CreateNew() {
    const { state, dispatch } = useContext(UserContext)

    const passwordConfirmed = () => {
        const password = document.querySelector('form').password
        const password2 = document.querySelector('form').password2
        if (password.value !== password2.value) {
            dispatch({ type: 'SET_ERROR', param: 'passwords don\'t match' }) 
            return false
        } else {
            return true
        }
    }

    const validateAndExecute = (e) => {
        e.preventDefault()
        if(passwordConfirmed()){
            const p = { name: e.target.name.value, password: e.target.password.value }
            dispatch({ type: 'NEW_WALLET', param: p })
        }
    }

    useEffect(()=>{
        if(state.error.er){
            setTimeout(()=>{
                dispatch({ type: 'ERROR_CLEAR' })
            },5000)
        }
    },[state.error])

    return <PageContent title="Create new account">
        <form onSubmit={e => validateAndExecute(e)}>
            <RowItemCustom>
                <div className="column">
                    <legend>Account Name</legend>
                    <input type="text" placeholder="enter account name" name="name" required />
                </div>
                <div className="column">
                    <legend>Password</legend>
                    <input type="password" placeholder="enter the password" name="password" required />
                </div>
                <div className="column">
                    <legend>Repeat Password</legend>
                    <input type="password" placeholder="repeat the password" name="password2" required />
                </div>
            </RowItemCustom>
            <RowItemSingle cl="mt-10">
                <button type='submit' className='button mr-10'>Create</button>
                <button type='button' className='button' onClick={() => dispatch({ type: 'PAGE', param: 'home' })}>Cancel</button>
                <span className='text-danger ml-20'>{state.error.msg}</span>
            </RowItemSingle>
        </form>
    </PageContent>
}