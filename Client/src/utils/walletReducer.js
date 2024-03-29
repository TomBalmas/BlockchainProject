import * as Acc from './walletEthers.js'
import * as Bcc from './walletBTC.js'
import * as Dcc from './walletDOGE.js'



const initError = {
    er: false,
    tp: '',
    value: '',
    param: '',
    msg: ''
}

const initTransaction = {
    recepient: '',
    amount: 0
}


export const initState = {
    page: 'home',   // new, created, dashboard, transaction, confirm, password
    accessBy: 0,    // 0 - password, 1 - private key, 2 - seed words
    name: '',
    address: '',    // account name
    BTCaddress: '',
    DOGEaddress: '',
    hdSeed: '',
    privateKey: '',
    password: '',
    mnemonic: '',
    network: 'goerli',
    coinSymbol: 'ETH',
    coinName: 'ethereum',
    balance: 0,
    price: 0,
    transactions: [],
    newTransaction: { ...initTransaction },
    interval: null,
    error: { ...initError }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "PAGE":
            //console.log(action.param)     
            //alert(action.param)         
            return {
                ...state,
                page: action.param
            }
        case "ACCESS":
            return {
                ...state,
                accessBy: action.param
            }
        case 'NEW_WALLET':
            const wallet = Acc.createNewWallet()
            const seed = Bcc.getNewSeed()
            let hdWallet = Bcc.getNewHdWallet(seed)
            const btc_address = Bcc.getAddress(hdWallet)
            const doge_address = Dcc.getAddress(hdWallet)
            const key = action.param.name
            const password = action.param.password
            const text = JSON.stringify({ privateKey: wallet.privateKey, address: wallet.address, name: key,BTCaddress:btc_address , DOGEaddress: doge_address, hdSeed:seed})
            const enc = Acc.encWallet(text, password)
            localStorage[key] = enc
            return {
                ...state,
                name: key,
                address: wallet.address,
                BTCaddress: btc_address,
                DOGEaddress: doge_address,
                hdSeed: seed,
                hdWallet:hdWallet,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase,
                page: 'created'
            }
        case 'EX_WALLET':
            let ewallet, edec, etext, eenc, err
            const epassword = action.param.password
            const ekey = action.param.name
            if (state.accessBy === 0) {
                try {
                    edec = localStorage[ekey]
                    ewallet = JSON.parse(Acc.decWallet(edec, epassword))
                    hdWallet = Bcc.getNewHdWallet(edec)
                } catch (e) {
                    err = { er: true, value: e, param: action.param, msg: 'access wallet by name/password error' }
                    console.log(err)
                    return {
                        ...state,
                        error: err
                    }
                }
            } else if (state.accessBy === 1) {
                try {
                    const pkwallet = Acc.restoreWalletByPrivateKey(action.param.pk)
                    ewallet = { privateKey: pkwallet.privateKey, address: pkwallet.address, name: ekey }
                    etext = JSON.stringify(ewallet)
                    eenc = Acc.encWallet(etext, epassword)
                    localStorage[ekey] = eenc
                    hdWallet = Bcc.getNewHdWallet(eenc)
                } catch (e) {
                    err = { er: true, value: e, param: action.param, msg: 'access wallet by private key error' }
                    console.log(err)
                    return {
                        ...state,
                        error: err
                    }
                }
            } else if (state.accessBy === 2) {
                try {
                    const mwallet = Acc.restoreWalletByMnemonic(action.param.mnemonic)
                    ewallet = { privateKey: mwallet.privateKey, address: mwallet.address, name: ekey }
                    etext = JSON.stringify(ewallet)
                    eenc = Acc.encWallet(etext, epassword)
                    localStorage[ekey] = eenc
                    hdWallet = Bcc.getNewHdWallet(eenc)
                } catch (e) {
                    err = { er: true, tp: 'EX_WALLET', value: e, param: action.param, msg: 'access wallet by mnemonic words error' }
                    console.log(err)
                    return {
                        ...state,
                        error: err
                    }
                }
            }
            return {
                ...state,
                name: ekey,
                address: ewallet.address,
                BTCaddress: ewallet.BTCaddress,
                DOGEaddress: ewallet.DOGEaddress,
                privateKey: ewallet.privateKey,
                hdSeed: ewallet.hdSeed,
                hdWallet: hdWallet,
                mnemonic: '',
                page: 'dashboard'
            }
        case 'BALANCE':
            return {
                ...state,
                balance: action.param
            }
        case 'PRICE':
            return {
                ...state,
                price: action.param
            }
        case 'TRANSACTIONS':
            return {
                ...state,
                transactions: action.param
            }
        case 'SET_NEW_TRANSACTION':
            return {
                ...state,
                page: 'confirm',
                newTransaction: action.param
            }
        case 'SET_NEW_TRANSACTION_BTC':
            return {
                ...state,
                page: 'confirmBTC',
                newTransaction: action.param
            }
        case 'SET_NEW_TRANSACTION_DOGE':
            return {
                ...state,
                page: 'confirmDOGE',
                newTransaction: action.param
            }                      
        case 'NEW_TRANSACTION_CLEAR':
            return {
                ...state,
                newTransaction: { ...initTransaction }
            }        
        case 'SET_ERROR':
            return {
                ...state,
                error: { er: true, tp: 'SET_ERROR', msg: action.param }
            }
        case 'ERROR_CLEAR':
            return {
                ...state,
                error: { ...initError }
            }        
        default:
            console.log(state)
            return state
           
    }
}
