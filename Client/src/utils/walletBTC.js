import axios from 'axios';
import Seed from "mnemonic-seed-js";
const crypto = require('crypto');
const hdkey = require('hdkey');
const bitcoin = require('bitcoinjs-lib');
var bitcoinTransaction = require('bitcoin-transaction');

export function getAddress(hdWallet) { 
    const bitcoinHdPath = "m/44'/0'/0'";
    const bitcoinHdWallet = hdWallet.derive(bitcoinHdPath);
    const bitcoinPubKey = bitcoinHdWallet.publicKey;
    return bitcoin.payments.p2pkh({ pubkey: bitcoinPubKey }).address;
}


export function getNewSeed() { 
     return Seed.new().buffer;
}
export function getNewHdWallet(seed){
    
    return hdkey.fromMasterSeed(seed);
}

export const getBtcPrice = async (coin='bitcoin') => {
    const url = `https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT`
    const response = await fetch(url)
    //console.log(response)
    const d = await response.json()
    return parseFloat(d["price"]).toFixed(2)
} 
export async function checkBalance(address) { 
    var bal;
    const response = await axios.get(`https://blockchain.info/balance?active=${address}`);
    const res = response.data;
    const balance = res[address]['final_balance'];
    // Sum up the value of the UTXOs to get the balance
    bal = balance;
    return bal;
}




export async function sendBTC(destAddress,amount,hdWallet) { 
    const bitcoinHdPath = "m/44'/0'/0'";
    const bitcoinHdWallet = hdWallet.derive(bitcoinHdPath);
    const network = bitcoin.networks.testnet;


    return await bitcoinTransaction.sendTransaction({
		from: getAddress(hdWallet),
		to: destAddress,
		privKeyWIF: bitcoinHdWallet.privateKey,
		btc: amount,
		network: "testnet"
	});

    // Add input (UTXO) to the transaction
    //transaction.addInput(txid, vout)
    // Add output to the transaction
    //transaction.addOutput(destAddress, amount);
    // Sign the input of the transaction
    //transaction.sign(0, keyPair);
    // Serialize and broadcast the transaction to the network
    //const tx = transaction.build();
    //const txHex = tx.toHex();
    //return transaction;
}


export async function transactionFeeBTC()
{
    
    const feePerByte = 10
    return  feePerByte
}
