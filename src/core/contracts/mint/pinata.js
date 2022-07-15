require('dotenv').config();
const key = process.env.REACT_APP_PINATA_API_KEY;
const secret = process.env.REACT_APP_PINATA_API_SECRET;
const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    console.log("JSONBody=>", JSONBody)
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
            //    pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
               pinataUrl: "https://ipfs.io/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
        });
};