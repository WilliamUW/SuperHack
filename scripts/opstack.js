require('dotenv').config();

const privKey = process.env.PRIV_KEY;

optimismSDK = require("@eth-optimism/sdk")

l1Url = "https://optimism-goerli.publicnode.com"
l2Url = "https://goerli.base.org"
l3Url = "https://testnet.rpc.zora.energy"

l1Provider = new ethers.providers.JsonRpcProvider(l1Url)
l2Provider = new ethers.providers.JsonRpcProvider(l2Url)
l3Provider = new ethers.providers.JsonRpcProvider(l3Url)

l1Signer = new ethers.Wallet(privKey).connect(l1Provider)
l2Signer = new ethers.Wallet(privKey).connect(l2Provider)
l3Signer = new ethers.Wallet(privKey).connect(l3Provider)

balances0 = [
    await l1Provider.getBalance(l1Signer.address),
    await l2Provider.getBalance(l1Signer.address),
    await l3Provider.getBalance(l1Signer.address),
]

zeroAddr = "0x".padEnd(42, "0")
l1Contracts = {
    StateCommitmentChain: zeroAddr,
    CanonicalTransactionChain: zeroAddr,
    BondManager: zeroAddr,
    // These contracts have the addresses you found out earlier.
    AddressManager: "0xa53ac6C172cB04f2c9Ea8356fAF89eA405430e14",   // Lib_AddressManager.json
    L1CrossDomainMessenger: "0xfB843f8c4992EfDb6b42349C35f025ca55742D33",   // Proxy__OVM_L1CrossDomainMessenger.json  
    L1StandardBridge: "0x7E5507281F62C0f8d666beAEA212751cD88994b8",   // Proxy__OVM_L1StandardBridge.json
    OptimismPortal: "0x3a605B442055DF2898E18cF518feb2e2A6BD0D31",   // OptimismPortalProxy.json
    L2OutputOracle: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294",   // L2OutputOracleProxy.json
}

bridges = {
    Standard: {
        l1Bridge: l1Contracts.L1StandardBridge,
        l2Bridge: "0x4200000000000000000000000000000000000010",
        Adapter: optimismSDK.StandardBridgeAdapter
    },
    ETH: {
        l1Bridge: l1Contracts.L1StandardBridge,
        l2Bridge: "0x4200000000000000000000000000000000000010",
        Adapter: optimismSDK.ETHBridgeAdapter
    }
}


crossChainMessenger = new optimismSDK.CrossChainMessenger({
    bedrock: true,
    contracts: {
        l1: l1Contracts
    },
    bridges: bridges,
    l1ChainId: await l1Signer.getChainId(),
    l2ChainId: await l2Signer.getChainId(),
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Signer,
})

crossChainMessenger2 = new optimismSDK.CrossChainMessenger({
    bedrock: true,
    contracts: {
        l1: l1Contracts
    },
    bridges: bridges,
    l1ChainId: await l1Signer.getChainId(),
    l2ChainId: await l3Signer.getChainId(),
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l3Signer,
})



tx = await crossChainMessenger.depositETH(1e9)
rcpt = await tx.wait()

balances1 = [
    await l1Provider.getBalance(l1Signer.address),
    await l2Provider.getBalance(l1Signer.address),
    await l3Provider.getBalance(l1Signer.address)
]

    (balances0[0] - balances1[0]) / 1e9

        ((await l2Provider.getBalance(l1Signer.address)) - balances0[1]) / 1e9
