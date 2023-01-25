import axios from 'axios';
const dogecore = require('dogecore-lib');
const walletBTC = require('./walletBTC')

// Derive an HD wallet for Dogecoin using BIP44
const dogecoinHdPath = "m/44'/3'/0'";
const dogecoinHdWallet = walletBTC.masterHdWallet.derive(dogecoinHdPath);
const dogecoinPubKey = dogecore.PublicKey.fromBuffer(dogecoinHdWallet.publicKey);
export const dogecoinAddress = dogecore.Address.fromPublicKey(dogecoinPubKey,dogecore.Networks.livenet).toString();
const privateKey = new dogecore.PrivateKey.fromWIF(dogecore.PrivateKey.fromBuffer(dogecoinHdWallet.privateKey).toString());
const fromAddress = dogecoinAddress;
console.log('dogecoinaddress: ' + dogecoinAddress)

export function sendDoge(toAddress,amount){
    const transcaion = new dogecore.Transaction().from(fromAddress).to(toAddress, amount).sign(privateKey);
    return transcaion;

}


export async function checkDODGEPrice() {
    const url = `https://api.binance.com/api/v3/avgPrice?symbol=DOGEUSDT`
    const response = await fetch(url)
    //console.log(response)
    const d = await response.json()
    return parseFloat(d["price"]).toFixed(2)
}

export async function checkDOGEBalance() { 
    var bal;
    const response = await axios.get('https://dogechain.info//api/v1/address/balance/' + dogecoinAddress);
    const res = response.data;
    // Sum up the value of the UTXOs to get the balance
    const balance = res['balance'];
    bal = balance;
    return bal;
}