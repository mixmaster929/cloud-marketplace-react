import Web3 from 'web3';
import { totalSupplies } from "../mint/interact";

require("dotenv").config();
// const contractABI = require("../mint/contract-abi.json");
const contractAddress = "0x4b388293e9165b5aa436f92e8477abce40eea6c6"; // mint

const marketplaceContractABI = require("./contract-abi.json");
const marketplaceContractAddress = "0x9c747ec7c93dbf5532eaee9106b1dcab5bc60028"; // marketplace bid

const web3 = new Web3(window.ethereum);

const marketplaceContract = new web3.eth.Contract(marketplaceContractABI, marketplaceContractAddress);

export const createAuction = async(initialBid, endAuction) => {
    const amount = web3.utils.toWei(initialBid, "ether");
    const tokenId = await totalSupplies();
    const nftToken = await marketplaceContract.methods.createAuction(contractAddress, tokenId, amount, endAuction).send({from: window.ethereum.selectedAddress})

    return {"auction_success": nftToken.status, "auction_status": nftToken.transactionHash}
}

export const placeBid = async (initialBid, auctionId) => {
    const amount = web3.utils.toWei(initialBid, "ether");
    const nftToken = await marketplaceContract.methods.bid(auctionId).send({from: window.ethereum.selectedAddress, value: amount})

    return {"bid_success": nftToken.status, "bid_status": nftToken.transactionHash, "address": window.ethereum.selectedAddress}
}

// For Bidder
export const claimNFT = async (auctionId) => {
  const nftToken = await marketplaceContract.methods.claimNFT(auctionId).send({from: window.ethereum.selectedAddress})

  return {"claim_success": nftToken.status, "claim_status": nftToken.transactionHash}
}
// For Auction Creator
export const claimToken = async (auctionId) => {
  
  const nftToken = await marketplaceContract.methods.claimToken(auctionId).send({from: window.ethereum.selectedAddress})

  return {"claim_success": nftToken.status, "claim_status": nftToken.transactionHash}
}

export const refund = async(auctionId) => {
  const nftToken = await marketplaceContract.methods.refund(auctionId).send({from: window.ethereum.selectedAddress});

  return {"refund_success": nftToken.status, "refund_status": nftToken.transactionHash}
}

export const getCurrentBid = async(auctionId) => {
    const data = await marketplaceContract.methods.getCurrentBid(auctionId).call();

    return data;
}

export const getCurrentBidOwner = async(auctionId) => {
  const data = await marketplaceContract.methods.getCurrentBidOwner(auctionId).call();

  return data;
}

export const isOpen = async(auctionId) => {
  const data = await marketplaceContract.methods.isOpen(auctionId).call();

  return data;
}