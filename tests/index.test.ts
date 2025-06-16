import {expect,test} from "bun:test";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
import { COUNTER_SIZE } from "./types";

const secretKeyBase58 = process.env.SECRET_KEY_BASE58;
if (!secretKeyBase58) {
  throw new Error("SECRET_KEY_BASE58 not found in .env");
}
const secretKey = bs58.decode(secretKeyBase58);
const adminAccount = Keypair.fromSecretKey(secretKey);
const PROGRAM_ID = new PublicKey("8i3oCBGigfCavabk8kNZC89Aw9Y4uvkEz7BmrQPmXviG");
//let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();

test("Account is initialized",async ()=>{
    const connection = new Connection("https://api.devnet.solana.com");
    const lamports = await connection.getMinimumBalanceForRentExemption(COUNTER_SIZE);
    const ix = SystemProgram.createAccount({
        fromPubkey:adminAccount.publicKey,
        lamports,
        space:COUNTER_SIZE,
        programId:PROGRAM_ID,
        newAccountPubkey:dataAccount.publicKey,
    });
    const createAccountTxn = new Transaction();
    createAccountTxn.add(ix);
    const signature = await connection.sendTransaction(createAccountTxn,[adminAccount,dataAccount]);
    const data2 = await connection.confirmTransaction(signature);
    console.log(data2);
    console.log(dataAccount.publicKey.toBase58());





// const txn = await connection.requestAirdrop(adminAccount.publicKey,LAMPORTS_PER_SOL);
    // await connection.confirmTransaction(txn);
    // const data = await connection.getAccountInfo(adminAccount.publicKey);
    // console.log(data);

})