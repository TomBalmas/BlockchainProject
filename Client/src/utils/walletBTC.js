import axios from 'axios';
import Seed from "mnemonic-seed-js";
const crypto = require('crypto');
const hdkey = require('hdkey');
const bitcoin = require('bitcoinjs-lib');
const seed = Seed.new();
export const masterHdWallet = hdkey.fromMasterSeed(seed.buffer);

const bitcoinHdPath = "m/44'/0'/0'";
const bitcoinHdWallet = masterHdWallet.derive(bitcoinHdPath);
const bitcoinPubKey = bitcoinHdWallet.publicKey;
export const bitcoinAddress = bitcoin.payments.p2pkh({ pubkey: bitcoinPubKey }).address;


export async function checkBalance() { 
    var bal;
    const response = await axios.get(`https://blockchain.info/balance?active=${bitcoinAddress}`);
    const res = response.data;
    const balance = res[bitcoinAddress]['final_balance'];
    // Sum up the value of the UTXOs to get the balance
    console.log(balance);
    bal = balance;
    return bal;
}


console.log(`Bitcoin address: ${bitcoinAddress}`);