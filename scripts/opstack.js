optimismSDK = require("@eth-optimism/sdk")

l1Provider = new ethers.providers.JsonRpcProvider(l1Url)
l2Provider = new ethers.providers.JsonRpcProvider(l2Url)
l1Signer = new ethers.Wallet(privKey).connect(l1Provider)
l2Signer = new ethers.Wallet(privKey).connect(l2Provider)
/*
zeroAddr = "0x".padEnd(42, "0")
l1Contracts = {
    StateCommitmentChain: zeroAddr,
    CanonicalTransactionChain: zeroAddr,
    BondManager: zeroAddr,
    // These contracts have the addresses you found out earlier.
    AddressManager: "0x....",   // Lib_AddressManager.json
    L1CrossDomainMessenger: "0x....",   // Proxy__OVM_L1CrossDomainMessenger.json  
    L1StandardBridge: "0x....",   // Proxy__OVM_L1StandardBridge.json
    OptimismPortal: "0x....",   // OptimismPortalProxy.json
    L2OutputOracle: "0x....",   // L2OutputOracleProxy.json
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
*/

balances0 = [
    await l1Provider.getBalance(l1Signer.address),
    await l2Provider.getBalance(l1Signer.address)
]
/*
tx = await crossChainMessenger.depositETH(1e9)
rcpt = await tx.wait()

balances1 = [
    await l1Provider.getBalance(l1Signer.address),
    await l2Provider.getBalance(l1Signer.address)
]

    (balances0[0] - balances1[0]) / 1e9

        ((await l2Provider.getBalance(l1Signer.address)) - balances0[1]) / 1e9
*/