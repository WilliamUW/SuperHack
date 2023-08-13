const express = require('express');
const { Network, Alchemy } = require('alchemy-sdk');

const app = express();
const port = 3000;

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.OPT_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Define endpoint to get latest block number
app.get('/latestBlock', async (req, res) => {
  try {
    const latestBlock = await alchemy.core.getBlockNumber();
    res.json({ latestBlock });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
