import React, { useContext } from 'react'
import RowItemSingle from './rowItemSingle'
import PageContent from './pageContent'
import UserContext from '../utils/walletContext.js'

export default function NewCreated() {
    const { state,dispatch } = useContext(UserContext)
    return (
        <PageContent title="New account is created!">
            <RowItemSingle>
                <div className="float-left mr-10">Mnemonic: </div>
                <div className="float-left font-bold">{state.mnemonic}</div>
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Address: </div>
                <div className="float-left font-bold">{state.address}</div>
            </RowItemSingle>
            <RowItemSingle>
                <div className="float-left mr-10">Private Key: </div>
                <div className="float-left font-bold">{state.privateKey}</div>
            </RowItemSingle>

            <RowItemSingle cl="mt-10">
                <button className='button' onClick={() => dispatch({ type: 'PAGE', param: 'dashboard' })}>Dashboard</button>
                <div>Warning: <span className='text-danger'>save the mnemonic phrase before close!</span></div>
            </RowItemSingle>
        </PageContent>
    )
}