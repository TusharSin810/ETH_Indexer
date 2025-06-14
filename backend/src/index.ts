import express from "express";
import { Client } from "pg";
import { HDNodeWallet} from "ethers6";
import { mnemonicToSeedSync } from "bip39";
import { MNUENOMICS } from "./config";
import cors from "cors";
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client(process.env.POSTGRESQL_CONNECTION_STRING)
client.connect();

const app = express();
const port = process.env.PORT;
const seed = mnemonicToSeedSync(MNUENOMICS);

app.use(express.json());

app.use(cors());

app.post("/signUp", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const result = await client.query('INSERT INTO UsersTable (username, password, depositAddress, privateKey, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id', [username, password, "", "", 0]);

    const userId = result.rows[0].id

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);
    await client.query('UPDATE UsersTable SET depositAddress=$1, privateKey=$2 WHERE id=$3', [child.address, child.privateKey, userId]);

    res.json({
        userId
    })
})

app.get("/depositAddress/:userId", (req,res) => {

})

app.listen(port, () => {
    console.log(`Running On Port : ${port}`);
})