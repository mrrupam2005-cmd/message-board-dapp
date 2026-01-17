let provider;
let signer;
let contract;

// Deployed MessageBoard contract address
const contractAddress = "0x02Ca3B72C573056bA20420beada4d68962497dd8";

// MessageBoard.sol ABI
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
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
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    alert("Wallet connected");
  } else {
    alert("MetaMask not detected");
  }
}

async function setMessage() {
  const message = document.getElementById("messageInput").value;
  const tx = await contract.setMessage(message);
  await tx.wait();
  alert("Message stored on blockchain");
}

async function getMessage() {
  const result = await contract.getMessage();
  document.getElementById("output").innerText =
    `Message: ${result[0]}\nSender: ${result[1]}`;
}
