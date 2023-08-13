import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

import MetaMaskSDK, { CommunicationLayerPreference } from "@metamask/sdk";

const options = {
  injectProvider: false,
  communicationLayerPreference: CommunicationLayerPreference.WEBRTC,
  dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
};

export default function Home() {
  const MMSDK = new MetaMaskSDK(options);

  const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

  // ethereum.request({ method: 'eth_requestAccounts', params: [] });

  const [hasProvider, setHasProvider] = useState(false);
  const initialState = { accounts: [] }; /* New */
  const [wallet, setWallet] = useState(initialState); /* New */

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts) => {
    /* New */
    setWallet({ accounts }); /* New */
  }; /* New */

  const handleConnect = async () => {
    if (window.ethereum) {
      /* New */
      let accounts = await window.ethereum.request({
        /* New */ method: "eth_requestAccounts" /* New */,
      }); /* New */
      updateWallet(accounts); /* New */
    }
  };

  const [verified, setVerified] = useState(false);

  const onSuccess = (result) => {
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
    setVerified(true);
  };

  const handleProof = async (result) => {
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      credential_type: result.credential_type,
      action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME,
      signal: "",
    };
    fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Successfully verified credential.");
      } else {
        throw (
          new Error("Error: " + (await res.json()).code) ?? "Unknown error."
        );
      }
    });
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff0000)",
    backgroundSize: "200% 200%",
    animation: "gradientAnimation 5s ease infinite",
    transition: "background 0.3s",
  };

  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [response, setResponse] = useState("");

  const connect = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
          params: [],
        })
        .then((res) => console.log("request accounts", res))
        .catch((e) => console.log("request accounts ERR", e));
    }
  };

  const addEthereumChain = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xA",
              chainName: "Optimism",
              blockExplorerUrls: ["https://optimistic.etherscan.io/"],
              nativeCurrency: { symbol: "OP", decimals: 18 },
              rpcUrls: ["https://mainnet.optimism.io/"],
            },
          ],
        })
        .then((res) => console.log("add", res))
        .catch((e) => console.log("ADD ERR", e));
    }
  };

  const addBaseChain = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x2105",
              chainName: "Base",
              blockExplorerUrls: ["	https://basescan.org"],
              nativeCurrency: { symbol: "OP", decimals: 18 },
              rpcUrls: ["https://mainnet.base.org"],
            },
          ],
        })
        .then((res) => console.log("add", res))
        .catch((e) => console.log("ADD ERR", e));
    }
  };

  const addBaseTestChain = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x14A33",
              chainName: "Base Goerli",
              blockExplorerUrls: ["	https://goerli.basescan.org"],
              nativeCurrency: { symbol: "OP", decimals: 18 },
              rpcUrls: ["https://goerli.base.org"],
            },
          ],
        })
        .then((res) => console.log("add", res))
        .catch((e) => console.log("ADD ERR", e));
    }
  };

  const addZoraChain = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x76ADF1",
              chainName: "Zora",
              blockExplorerUrls: ["	https://explorer.zora.energy"],
              nativeCurrency: { symbol: "OP", decimals: 18 },
              rpcUrls: ["https://rpc.zora.energy"],
            },
          ],
        })
        .then((res) => console.log("add", res))
        .catch((e) => console.log("ADD ERR", e));
    }
  };

  const addZoraTestChain = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x3E7",
              chainName: "Zora Goerli",
              blockExplorerUrls: ["https://testnet.explorer.zora.energy"],
              nativeCurrency: { symbol: "ETH", decimals: 18 },
              rpcUrls: ["https://testnet.rpc.zora.energy"],
            },
          ],
        })
        .then((res) => console.log("add", res))
        .catch((e) => console.log("ADD ERR", e));
    }
  };

  const addMumbaiChain = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x1A4",
              chainName: "Optimism Goerli",
              blockExplorerUrls: ["	https://goerli-explorer.optimism.io"],
              nativeCurrency: { symbol: "ETH", decimals: 18 },
              rpcUrls: ["https://optimism-goerli.publicnode.com"],
            },
          ],
        })
        .then((res) => console.log("add", res))
        .catch((e) => console.log("ADD ERR", e));
    }
  };

  const addModeChain = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x397",
              chainName: "Mode Testnet",
              blockExplorerUrls: ["https://sepolia.explorer.mode.network"],
              nativeCurrency: { symbol: "ETH", decimals: 18 },
              rpcUrls: ["https://sepolia.mode.network"],
            },
          ],
        })
        .then((res) => console.log("add", res))
        .catch((e) => console.log("ADD ERR", e));
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chain) => {
        console.log(chain);
        setChain(chain);
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log(accounts);
        setAccount(accounts?.[0]);
      });
    }
  }, []);

  const sendTransaction = async () => {
    if (window.ethereum) {
      const to = "0x0000000000000000000000000000000000000000";
      const transactionParameters = {
        to, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: "0x5AF3107A4000", // Only required to send ether to the recipient from the initiating external account.
      };

      try {
        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        setResponse(txHash);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sign = async () => {
    if (window.ethereum) {
      const msgParams = JSON.stringify({
        domain: {
          // Defining the chain aka Rinkeby testnet or Ethereum Main Net
          chainId: parseInt(window.ethereum.chainId, 16),
          // Give a user friendly name to the specific contract you are signing for.
          name: "Ether Mail",
          // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
          verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
          // Just let's you know the latest version. Definitely make sure the field name is correct.
          version: "1",
        },

        // Defining the message signing data content.
        message: {
          /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
          contents: "Hello, Bob!",
          attachedMoneyInEth: 4.2,
          from: {
            name: "Cow",
            wallets: [
              "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
              "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
            ],
          },
          to: [
            {
              name: "Bob",
              wallets: [
                "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
                "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
                "0xB0B0b0b0b0b0B000000000000000000000000000",
              ],
            },
          ],
        },
        // Refers to the keys of the *types* object below.
        primaryType: "Mail",
        types: {
          // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" },
          ],
          // Not an EIP712Domain definition
          Group: [
            { name: "name", type: "string" },
            { name: "members", type: "Person[]" },
          ],
          // Refer to PrimaryType
          Mail: [
            { name: "from", type: "Person" },
            { name: "to", type: "Person[]" },
            { name: "contents", type: "string" },
          ],
          // Not an EIP712Domain definition
          Person: [
            { name: "name", type: "string" },
            { name: "wallets", type: "address[]" },
          ],
        },
      });

      var from = window.ethereum.selectedAddress;

      var params = [from, msgParams];
      var method = "eth_signTypedData_v4";

      try {
        const resp = await window.ethereum.request({ method, params });
        setResponse(resp);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={styles.container}>
      {!verified && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <div>
            <h1
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                fontSize: "36px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Welcome to Super.ai for SuperHack 2023!
            </h1>
            <h2
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                fontSize: "24px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              When I first stumbled upon the OP Stack documentation, I was
              utterly overwhelmed and didn't know where to begin. I wanted to
              ask questions but I too embarassed to take up a sponsor's time,
              and sometimes I didn't even know what questions to ask. I was so
              close to just giving up on this hackathon when I realized: "Hey,
              maybe this is a problem I can help solve!"
            </h2>
            <h2
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                fontSize: "24px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              This is where I got the inspiration for Super.ai! The easiest way
              to get started with development on OP Stack.
            </h2>
            <h2
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                fontSize: "24px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Super.ai will be with you every step of the way to answer any
              questions you have, provide live Tech demos, and write code for
              you to reduce the friction when it comes to blockchain
              development!
            </h2>
          </div>
          <h1>&nbsp;</h1>
          <IDKitWidget
            action={process.env.NEXT_PUBLIC_WLD_ACTION_NAME || ""}
            onSuccess={onSuccess}
            handleVerify={handleProof}
            app_id={process.env.NEXT_PUBLIC_WLD_APP_ID || ""}
            credential_types={[CredentialType.Orb, CredentialType.Phone]}
          >
            {({ open }) => (
              <button
                onClick={open}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  color: "#fff",
                  backgroundColor: "black",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s",
                }}
              >
                Verify with World ID
              </button>
            )}
          </IDKitWidget>
          <h1>&nbsp;</h1>

          <div>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</div>
          <h1>&nbsp;</h1>
          <button
            onClick={handleConnect}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "orange",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
          >
            Connect MetaMask
          </button>

          <h1>&nbsp;</h1>
          <p className="text-13 text-c2a4e5">Powered by MetaMask SDK</p>

          <h1>&nbsp;</h1>

          {wallet.accounts.length > 0 /* New */ && (
            <h1>Wallet Accounts: {wallet.accounts[0]}</h1>
          )}

          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "orange",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={sign}
          >
            Sign using your MetaMask Wallet!
          </button>

          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "orange",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={sendTransaction}
          >
            Send a Transaction!
          </button>

          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "orange",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={addEthereumChain}
          >
            Add Optimism Mainnet to your MetaMask Wallet!
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "orange",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={addMumbaiChain}
          >
            Add Optimism Goerli Testnet to your MetaMask Wallet!
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "orange",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={addModeChain}
          >
            Add Mode Testnet to your MetaMask Wallet!
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "blue",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={addBaseChain}
          >
            Add Base Network to your MetaMask Wallet!
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "blue",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={addBaseTestChain}
          >
            Add Base Network to your MetaMask Wallet!
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "purple",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={addZoraChain}
          >
            Add Zora Network to your MetaMask Wallet!
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "purple",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            onClick={addZoraTestChain}
          >
            Add Zora Georli Network to your MetaMask Wallet!
          </button>

          {chain && `Connected chain: ${chain}`}
          <p></p>
          {account && `Connected account: ${account}`}
          <p></p>
          {response && `Last request response: ${response}`}

          <h1>&nbsp;</h1>
          
          <p className="text-13 text-c2a4e5">Powered by WorldCoin</p>
          <img src="https://s11.gifyu.com/images/ScAl9.gif"></img>
        </div>
      )}
      {verified && (
        <iframe
          src="https://creator.voiceflow.com/prototype/64d8237561533a0007acb666"
          width="100%"
          height="100%"
        ></iframe>
      )}
      {wallet.accounts.length > 0 /* New */ && (
        <div>Wallet Accounts: {wallet.accounts[0]}</div>
      )}
    </div>
  );
}
