const router = require('koa-router')()
const sdk = require("@eth-optimism/sdk");
const ethers = require("ethers")
require('dotenv').config();
const l2Provider = new ethers.providers.JsonRpcProvider("https://opbnb-testnet-rpc.bnbchain.org")
const l2ProviderCombo = new ethers.providers.JsonRpcProvider("https://test-rpc.combonetwork.io")
const l1Provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.nodereal.io/v1/f91638d05fe24b88964b5446df16fe56")
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)

const l1Signer = wallet.connect(l1Provider);

let crossChainMessenger = new sdk.CrossChainMessenger({
  l1ChainId: 97,
  l2ChainId: 5611,
  l1SignerOrProvider: l1Signer,
  l2SignerOrProvider: l2Provider,
  contracts: {
    l1: {
        AddressManager: "0x0000000000000000000000000000000000000000",
        L1CrossDomainMessenger: "0xD506952e78eeCd5d4424B1990a0c99B1568E7c2C",
        L1StandardBridge: "0x677311Fd2cCc511Bbc0f581E8d9a07B033D5E840",
        StateCommitmentChain: "0xFf2394Bb843012562f4349C6632a0EcB92fC8810",
        CanonicalTransactionChain: "0x0000000000000000000000000000000000000000",
        BondManager: "0x0000000000000000000000000000000000000000",
        OptimismPortal: "0x4386C8ABf2009aC0c263462Da568DD9d46e52a31",
        L2OutputOracle: "0xFf2394Bb843012562f4349C6632a0EcB92fC8810",
    }

}
});

let crossChainMessengerCombo = new sdk.CrossChainMessenger({
  l1ChainId: 97,
  l2ChainId: 91715,
  l1SignerOrProvider: l1Signer,
  l2SignerOrProvider: l2ProviderCombo,
  contracts: {
    l1: {
      "AddressManager": "0x0000000000000000000000000000000000000000",
      "StateCommitmentChain": "0x0000000000000000000000000000000000000000",
      "CanonicalTransactionChain": "0x0000000000000000000000000000000000000000",
      "BondManager": "0x0000000000000000000000000000000000000000",
      "L1CrossDomainMessenger": "0x0cf9129cc088296A0401B6003cD7D3380d10dAaE",
      "L1StandardBridge": "0x261436b25a95449350C1EB11882f46F4140Dbf74",
      "OptimismPortal": "0x279986e2E26CEd9bf7bcF49282398e74142c3760",
      "L2OutputOracle": "0x9DD772cC8ccBE71c769C98A8F1De1898BcF9E83b"
    }

}
});

router.post('/crossChainMessenger', async (ctx, next) => {
  let body = ctx.request.body;
  let method = body.method;
  let params = body.params;
  try {
    let res = await crossChainMessenger[method](...params);
    ctx.body = res;
  } catch (error) {
    ctx.body = error;
  }
})

router.get('/messageStatus', async (ctx, next) => {

  try {
    let res = sdk.MessageStatus;
    ctx.body = res;
  } catch (error) {
    ctx.body = error;
  }
})

router.post('/combo/crossChainMessenger', async (ctx, next) => {
  let body = ctx.request.body;
  let method = body.method;
  let params = body.params;
  try {

    let res = await crossChainMessengerCombo[method](...params);
    ctx.body = res;
  } catch (error) {
    ctx.body = String(error)
  }
})

module.exports = router
