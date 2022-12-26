import React, { useContext } from 'react'
import UserContext from '../utils/walletContext'
import * as Lib from '../utils/lib'

export default function Transactions() {
    const { state } = useContext(UserContext)
    return (
        state.transactions.length === 0 ? <div className='font-12'>No data ...</div> :
            <table className='font-12'>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Time</th>
                        <th>Hash</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.transactions.map((t,i) => {
                            return (
                                <tr key={i}>
                                    <td>{t.to === state.address ? 'in' : 'out'}</td>
                                    <td>{t.value}</td>
                                    <td>{Lib.unixToDate(t.time)}</td>
                                    <td><a href={Lib.etherscanUrlTrans(state.network, t.hash)} target='_blank'
                                        rel="noopener noreferrer" title={t.hash}>{Lib.trimedStr(t.hash, 20)}</a></td>
                                </tr>
                            )
                        })
                    }</tbody></table>)
}