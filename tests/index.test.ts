import {expect,test} from "bun:test";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();

test("Account is initialized",async ()=>{
    const connection = new Connection("http://127.0.0.1:8899");
    const txn = await connection.requestAirdrop(adminAccount.publicKey,LAMPORTS_PER_SOL);
    await connection.confirmTransaction(txn);

    const data = await connection.getAccountInfo(adminAccount.publicKey);
    console.log(data);
    console.log(adminAccount.publicKey.toBase58);
})