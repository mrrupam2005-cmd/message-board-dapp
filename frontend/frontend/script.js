let provider;
let signer;
let contract;

// 🔴 Remix থেকে পাওয়া CONTRACT ADDRESS এখানে বসাতে হবে
const contractAddress = "PASTE_CONTRACT_ADDRESS_HERE";

const contractABI = [
  {
    "inputs":[{"internalType":"string","name":"_message","type":"string"}],
    "name":"setMessage",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"getMessage",
    "outputs":[
      {"internalType":"string","name":"","type":"string"},
      {"internalType":"address","name":"","type":"address"},
      {"internalType":"uint256","name":"","type":"uint256"}
    ],
    "stateMutability":"view",
    "type":"function"
  }
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  document.getElementById("account").innerText =
    "Connected: " + await signer.getAddress();

  contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
}

async function setMessage() {
  const msg = document.getElementById("messageInput").value;
  const tx = await contract.setMessage(msg);
  await tx.wait();
  alert("Message stored on blockchain!");
}

async function getMessage() {
  const data = await contract.getMessage();
  document.getElementById("output").innerText =
    "Message: " + data[0];
}
