const express = require('express');
const Web3 = require('web3');

const app = express();
const port = 3000;

// Connect to Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Replace with your provider

// ABI and address of deployed Greeter contract
const greeterABI = [...]; // Add ABI here
const greeterAddress = '0x...'; // Add contract address here

// Create contract instance
const greeterContract = new web3.eth.Contract(greeterABI, greeterAddress);

// Define endpoint to get greeting
app.get('/greet', async (req, res) => {
  try {
    const greeting = await greeterContract.methods.greet().call();
    res.json({ greeting });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
