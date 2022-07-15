import React, { memo, useState, useEffect } from "react";
import { claimToken } from '../../../core/contracts/bid/interact'

export const GlobalPayment = ({auctionId}) => {

	console.log("global payment=>", auctionId)
	useEffect(async () => {
		console.log("global")
    
		// await claimToken(auctionId)
  }, [auctionId]);
	return (
		<div></div>
	)
};
export default GlobalPayment;