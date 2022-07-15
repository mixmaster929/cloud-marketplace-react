import Web3 from 'web3';
import { pinJSONToIPFS } from "./pinata.js";

require("dotenv").config();
const mintContractABI = require("./contract-abi.json");
const mintContractAddress = "0x4b388293e9165b5aa436f92e8477abce40eea6c6"; // mint
const marketBidAddress = "0x9c747ec7c93dbf5532eaee9106b1dcab5bc60028"; // marketplace bid
const web3 = new Web3(window.ethereum);
window.ethereum.enable();

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Metamask successfuly connected.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Fill in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (url, price, deadlinePreview, deadlinePreviewTimestamp, name, description, collectionId, chainId, royalty) => {
  if (url.trim() === "" || name.trim() === "") {
    return {
      success: false,
      status: "Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = {};
  metadata.image = url;
  metadata.price = price;
  metadata.deadlinePreview = deadlinePreview;
  metadata.deadlinePreviewTimestamp = deadlinePreviewTimestamp;
  metadata.name = name;
  metadata.description = description;
  metadata.royalty = royalty;
  metadata.chainId = chainId;
  metadata.collectionId = collectionId;
  
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  const mintContract = new web3.eth.Contract(mintContractABI, mintContractAddress);


  const nftToken = await mintContract.methods.createNFtToken(tokenURI).send({ from: window.ethereum.selectedAddress })


  return { "success": nftToken.status, "status": nftToken.transactionHash }

};

export const approve = async () => {
  const mintContract = new web3.eth.Contract(mintContractABI, mintContractAddress);
  const tokenId = await totalSupplies();

  const nftToken = await mintContract.methods.approve(marketBidAddress, tokenId).send({ from: window.ethereum.selectedAddress })

  return { "approve_success": nftToken.status, "approve_status": nftToken.transactionHash }
}

export const totalSupplies = async () => {
  const nftContract = new web3.eth.Contract(mintContractABI, mintContractAddress);
  const counts = await nftContract.methods.totalSupply().call();

  return counts;
}

export const getAllTokenURIs = async () => {
  let alltokenURIs = []
  const nftContract = new web3.eth.Contract(mintContractABI, mintContractAddress);
  const counts = await totalSupplies();

  for (let i = 0; i < counts; i++) {
    const data = await nftContract.methods.tokenURI(i + 1).call();
    alltokenURIs.push(data)
  }
  return alltokenURIs;
}

export const getApproved = async (tokenId) => {
  const nftContract = new web3.eth.Contract(mintContractABI, mintContractAddress);
  const result = await nftContract.methods.getApproved(tokenId).call();

  return result
}