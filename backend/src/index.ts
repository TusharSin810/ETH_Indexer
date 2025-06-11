import express from "express";
import pg from "pg";
import { HDNodeWallet, Wallet } from "ethers6";
import { mnemonicToSeedSync } from "bip39";
import { MNUENOMICS } from "../config";

const app = express();
const port = 3000;
const seed = mnemonicToSeedSync(MNUENOMICS);


app.post("/signUp", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userId = 1;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);
    console.log(child);

    res.json({
        userId
    })
})

app.get("/depositAddress/:userId", (req,res) => {

})

app.listen(port, () => {
    console.log(`Running On Port : ${port}`);
})