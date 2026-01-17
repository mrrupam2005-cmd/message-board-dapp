let provider;
let signer;
let contract;

// 🔴 এখানে তোমার deployed contract address বসাও
const contractAddress = "PASTE_CONTRACT_ADDRESS_HERE";

// ✅ MessageBoard.sol ABI
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// 🔹 Connect MetaMask
async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const address = await signer.getAddress();
    document.getElementById("account").innerText =
      "Connected: " + address;
  } else {
    alert("MetaMask not found!");
  }
}

// 🔹 Send message to blockchain
async function setMessage() {
  const message = document.getElementById("messageInput").value;
  if (!message) {
    alert("Please write a message");
    return;
  }

  const tx = await contract.setMessa
