import { JsonRpcProvider } from "ethers";
import axios from "axios";
let CURRENT_BLOCK_NUMBER = 22703371;

const provider = new JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/ch2xeAWYr9E6ShlCU3e2VI7wvh5dXXhj')

async function main(){

    const interestedAddress = ["0x09dAC5113C1F43af9795738607d338E0634737Db","0x2DDE850CA32a45D5FbCdc2E6eF52Ed01EEf9E248","0x3425A070B73d6BA96e49af9933F11975B5C02b03","0xf450896071a88b1455E716A19F2be348814A8E41","0x96F4A1BC22Ebd04108bd1FCE2943308Aa89636D0"];

    const transactions = await getTransactionReceipt(CURRENT_BLOCK_NUMBER.toString());

    const interestedTransactions = transactions?.result.filter(x => interestedAddress.includes(x.to))

    const fullTxns = await Promise.all(interestedTransactions.map(async ({transactionHash}) => {
        const txn = await provider.getTransaction(transactionHash);
        return txn;
    }))

    console.log(fullTxns)

}

interface TransactionReceipt {
    transactionHash: string;
    from: string;
    to: string;
}

interface TransactionReceiptResponse {
    result: TransactionReceipt[]
}

async function getTransactionReceipt(blockNumber: string): Promise<TransactionReceiptResponse> {
    let data = JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "eth_getBlockReceipts",
        "params": ["0x" + parseInt(blockNumber).toString(16)]
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://eth-mainnet.g.alchemy.com/v2/e3fUoPqdyoLlCGWNHdY2lEOaovOsKddu',
        headers: { 
          'accept': 'application/json', 
          'content-type': 'application/json', 
          'Cookie': '_cfuvid=Qn1QTPgL8vHUo0A_cayd0JmLEtgJy5VQKGI5IFuem44-1737735399258-0.0.1.1-604800000'
        },
        data : data
      };
      
      const response = await axios.request(config)
      return response.data; 
}

main()
