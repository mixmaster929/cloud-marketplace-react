import Web3 from 'web3';
import { totalSupplies } from "../mint/interact";
import Blocks from 'eth-block-timestamp'
import {BigNumber, BigInt} from 'big-number'

const blocks = new Blocks(window.ethereum);

require("dotenv").config();
const contractABI = require("../mint/contract-abi.json");
const contractAddress = "0x4b388293e9165b5aa436f92e8477abce40eea6c6"; // mint

const bidContractABI = require("./contract-abi.json");
const bidContractAddress = "0x9c747ec7c93dbf5532eaee9106b1dcab5bc60028"; // marketplace bid

const buyContractABI = require("./contract-abi.json");
const buyContractAddress = "0xa5813FaE3C1776c208F54FDC8AA07258E8013543"; // marketplace buy

const web3 = new Web3(window.ethereum);

export const buyItem = async( tokenId) => {
    const timestamp = endAuction/1000;
    const amount = web3.utils.toWei(initialBid, "ether");
    console.log("timestamp=>", timestamp)
    console.log("amount=>", amount)
    const marketplaceContract = await new web3.eth.Contract(marketplaceContractABI, marketplaceContractAddress);
    const tokenId = await totalSupplies();
    console.log("tokenId=>", tokenId)

    const transactionParameters = {
      to: marketplaceContractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: marketplaceContract.methods.createAuction(contractAddress, tokenId, amount, timestamp).encodeABI(),
    };
  
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        auction_success: true,
        auction_status:
          "Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
          txHash,
      };
    } catch (error) {
      return {
        auction_success: false,
        auction_status: "Something went wrong: " + error.message,
      };
    }
}