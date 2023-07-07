const { ethers } = require('ethers');
const l2CrossDomainMessengerContractAbi = require('./abis/l2CrossDomainMessengerContractAbi'); // 合约的 ABI
const l2CrossDomainMessengerContractAddress = '0x4200000000000000000000000000000000000007'; // 合约地址
const l2ProviderUrl = 'https://rpc.ankr.com/optimism'; // 以太坊网络提供者的 URL

async function listenl2CrossDomainMessengerSendMessage() {
  // 连接到以太坊网络的提供者
  const provider = new ethers.providers.JsonRpcProvider(l2ProviderUrl);

  // 实例化合约对象
  const contract = new ethers.Contract(l2CrossDomainMessengerContractAddress, l2CrossDomainMessengerContractAbi, provider);

  // 订阅事件
  contract.on('SentMessage', (_target, _sender, _message, _gasLimit, event) => {
    console.log('Target:', _target);
    console.log('Sender:', _sender);
    console.log('Message:', _message);

    // 获取交易哈希
  const transactionHash = event.transactionHash;
  console.log('Transaction Hash:', transactionHash);
  });
  console.log('启动');
  // 等待事件的发生
  await new Promise(() => {});
}

listenl2CrossDomainMessengerSendMessage();
