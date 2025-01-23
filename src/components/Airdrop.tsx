// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react";

export const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance,setBalance]=useState('');

  const getInfo=async()=>{
    const info=await connection.getAccountInfo(wallet.publicKey);
    const balance=info?.lamports || 0;
    setBalance(balance);
  }

  useEffect(()=>{
    getInfo()
  },[connection, getInfo])

  const sendAirdropToUser = async () => {
    try {
      const inputValue = document.getElementById("pk").value;
      const amt = inputValue * 100000000;
      
      alert('called');
      await connection?.requestAirdrop(wallet.publicKey, amt);
      alert("done");
    } catch (error) {
      alert("Failed: " + error.message);
    }
  }

  return (
    <div style={{height:'200px', width:'400px'}}>
      {wallet.publicKey?.toString()}
      <div>Balance: {balance}</div>
      <input type="text" id="pk" placeholder="Amount" />
      <button onClick={sendAirdropToUser}>Send airdrop</button>
    </div>
  )
}