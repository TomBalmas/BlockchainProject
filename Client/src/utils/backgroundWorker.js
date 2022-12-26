import * as Acc from './walletEthers'

export const getBalance = async (state, dispatch) => {
    try {
        const balance = await Acc.getBalance(state.address, state.network)
        dispatch({ type: 'BALANCE', param: balance })
    } catch (e) {
        dispatch({ type: 'SET_ERROR', param: 'balance request error' })
    }
}

export const getPrice = async (state, dispatch) => {
    try {
        const price = await Acc.getPrice(state.coinName)
        dispatch({ type: 'PRICE', param: price })
    } catch (e) {
        dispatch({ type: 'SET_ERROR', param: 'price request error' })
    }
}

export const getTransactions = async (state, dispatch) => {
    try {
        const transactions = await Acc.getLastTransactions(state.network, state.address)
        dispatch({ type: 'TRANSACTIONS', param: transactions })
    } catch (e) {
        dispatch({ type: 'SET_ERROR', param: 'transactions request error' })
    }
}

// for data updates with setInterval
/* 
const interval = {
    error: 5000,
    balance: 2000,
    price: 20000,
    transactions: 20000
}

const pages = {
    error: ['new', 'dashboard', 'password', 'transaction', 'dashboard'],
    balance: ['dashboard', 'transaction', 'confirm'],
    price: ['dashboard', 'transaction', 'confirm'],
    transactions: ['dashboard']
}

export const BackgroundWorker = (state, dispatch) => {
    // error clear
    setInterval(() => {
        if (pages.balance.includes(state.error)) {
            dispatch({ type: 'ERROR_CLEAR'})
        }
    }, interval.error) 

    // update balance
    setInterval( () => {
        if (pages.balance.includes(state.page)) {
            getBalance(state, dispatch)
        }
    }, interval.balance)

    // update price
    setInterval(() => {
        if (pages.price.includes(state.page)) {
            getPrice(state, dispatch)
        }
    }, interval.price)

    // update transactions
    setInterval(() => {
        if (pages.transactions.includes(state.page)) {
            getTransactions(state, dispatch)
        }
    }, interval.transactions)
}  */