let provider;
let signer;
let contract;

const contractAddress = "PASTE_CONTRACT_ADDRESS_HERE";

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_message", "type": "string" }
    ],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMessage",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

  const address = await signer.getAddress();
  document.getElementById("account").innerText =
    "Connected: " + address;

  contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
}

async function setMessage() {
  const msg = document.getElementById("messageInput").value;
  if (!msg) {
    alert("Write a message first");
    return;
  }

  const tx = await contract.setMessage(msg);
  await tx.wait();

  alert("Message stored on blockchain");
}

async function getMessage() {
  const data = await contract.getMessage();

  document.getElementById("output").innerText =
    "Message: " + data[0] +
    "\nSender: " + data[1];
}
