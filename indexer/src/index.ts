import { JsonRpcProvider } from "ethers"
let CURRENT_BLOCK_NUMBER = 22703371;

const provider = new JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/ch2xeAWYr9E6ShlCU3e2VI7wvh5dXXhj')

async function main(){

    const interestedAddress = ["0x09dAC5113C1F43af9795738607d338E0634737Db","0x2DDE850CA32a45D5FbCdc2E6eF52Ed01EEf9E248","0x3425A070B73d6BA96e49af9933F11975B5C02b03","0xf450896071a88b1455E716A19F2be348814A8E41","0x96F4A1BC22Ebd04108bd1FCE2943308Aa89636D0"];
    const block = await provider.getBlock(CURRENT_BLOCK_NUMBER, true)
    console.log(block);

}
main();