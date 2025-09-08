"use client";

import { InputForm } from "./ui/InputField";
import { useState } from "react";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import { useChainId, useConfig, useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [receipients, setReceipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const config = useConfig();
  const account = useAccount();
  const chainId = useChainId();

  // This function will get the tsender address(contract address) and make a function call to allowance function
  const getAmountApproved = async (
    tsenderAddress: string | null
  ): Promise<number> => {
    if (!tsenderAddress) return 0;

    // if tsender address exists
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tsenderAddress as `0x${string}`],
    });

    return response as number;
  };

  const handleSubmit = async () => {
    console.log(tokenAddress, receipients, amounts);
    // TODO
    const tSenderAddress = chainsToTSender[chainId!]["tsender"];
    const approvedAmount = await getAmountApproved(tSenderAddress);
    console.log("approved amount", approvedAmount);
    // 1a. If already approved move to step 2
    // 1b. Else Approve our tsender contract to send our tokens
    // 2. Call the airdrop function on our tsender contract
    // 3. Wait for the transaction to be mined
  };

  return (
    <div>
      <InputForm
        label="Token Address"
        placeholder="0x..."
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <InputForm
        label="Receipients"
        placeholder="0x..."
        type="text"
        value={receipients}
        onChange={(e) => setReceipients(e.target.value)}
      />
      <InputForm
        label="Amounts"
        placeholder="0x..."
        type="text"
        value={amounts}
        onChange={(e) => setAmounts(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
