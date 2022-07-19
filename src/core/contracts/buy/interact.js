import Web3 from 'web3';

require("dotenv").config();
const contractABI = require("../mint/contract-abi.json");
const contractAddress = "0x4b388293e9165b5aa436f92e8477abce40eea6c6"; // mint

const bidContractABI = require("./contract-abi.json");
const bidContractAddress = "0x9c747ec7c93dbf5532eaee9106b1dcab5bc60028"; // marketplace bid

const buyContractABI = require("./contract-abi.json");
const buyContractAddress = "0xa5813FaE3C1776c208F54FDC8AA07258E8013543"; // marketplace buy

const web3 = new Web3(window.ethereum);
const marketplaceContract = new web3.eth.Contract(buyContractABI, buyContractAddress);

export const buyItem = async(tokenId, buyPrice) => {

  const amount = web3.utils.toWei(buyPrice, "ether");
  const nftToken = await marketplaceContract.methods.buyItem(contractAddress, tokenId).send({from: window.ethereum.selectedAddress, value: amount})

  return {"buy_success": nftToken.status, "buy_status": nftToken.transactionHash}
}

export const buyListItem = async(tokenId, buyPrice) => {

  const amount = web3.utils.toWei(buyPrice, "ether");
  const nftToken = await marketplaceContract.methods.listItem(contractAddress, tokenId, amount).send({from: window.ethereum.selectedAddress})

  return {"buy_list_success": nftToken.status, "buy_list_status": nftToken.transactionHash}
}

export const buyApprove = async (tokenId) => {
  const mintContract = new web3.eth.Contract(contractABI, contractAddress);
  const nftToken = await mintContract.methods.approve(buyContractAddress, tokenId).send({ from: window.ethereum.selectedAddress })
  console.log("process=>=>", nftToken.status)
  return { "buy_approve_success": nftToken.status, "buy_approve_status": nftToken.transactionHash }
}