const router = require('koa-router')()
const sdk = require("@eth-optimism/sdk");
const ethers = require("ethers")
const l2Provider = new ethers.providers.JsonRpcProvider("https://opbnb-testnet-rpc.bnbchain.org")
const l1Provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.publicnode.com")
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

module.exports = router
