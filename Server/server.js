const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto');
const bitcoin = require('bitcoinjs-lib');
const port = 3001

const dbCon = require('./databaseConnection');

// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors());

//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})

//Route that handles login logic
app.post('/login', (req, res) =>{
    var mail = req.body.email.toLowerCase()
    var pass = req.body.password
    dbCon.login(mail, pass, res);
    console.log(req.body.email);
    console.log(req.body.password);
})

//Route that handles signup logic
app.post('/Signup', (req, res) =>{
var mail = req.body.email.toLowerCase()
var pass = req.body.password
var seedWords = req.body.seedWords
var keys = generateWalletKeys()//need to implement
var privateKey = keys[0]
var publicKey = keys[1]
dbCon.insertToSchema( { email: String, password: String, seedWords: String, privateKey: String, publicKey: String },
        {  'email': mail, 'password': pass, 'SeedWords': seedWords, 'privateKey': privateKey, 'publicKey': publicKey  },res);
})

let wallet = {};

app.post('/wallet', (req, res) => {
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  wallet = {
    address,
    privateKey: keyPair.toWIF()
  };

  res.json({ address, privateKey: keyPair.toWIF() });
});

app.post('/send', (req, res) => {
  const { to, amount } = req.body;
  const tx = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);

  // Add the output for the recipient address
  tx.addOutput(to, amount);

  // Add the output for the change address (the wallet's address)
  tx.addOutput(wallet.address, bitcoin.Transaction.DEFAULT_SEQUENCE);

  // Sign the transaction with the wallet's private key
  tx.sign(0, bitcoin.ECPair.fromWIF(wallet.privateKey));

  // Send the transaction to the network
  const txid = tx.build().toHex();
  res.json({ txid });
});

app.get('/balance', (req, res) => {
  // In a real implementation, you would use a blockchain explorer API to get the balance of the wallet's address
  const balance = Math.random() * 100;
  res.json({ balance });
});
