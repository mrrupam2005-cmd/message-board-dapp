let provider;
let signer;
let contract;

// 🔴 এখানে নিজের contract address বসাও
const CONTRACT_ADDRESS = "0x47e38A40a999b07fDCb160a9B621763c834DE231";

// ABI (MessageBoard.sol থেকে)
const ABI = [
  "function setMessage(string _message)",
  "function getMessage() view returns (string)",
  "function lastSender() view returns (address)",
  "function lastUpdated() view returns (uint256)"
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  alert("Wallet connected!");
  loadData();
}

async function setMessage() {
  const msg = document.getElementById("messageInput").value;
  if (!msg) {
    alert("Message empty");
    return;
  }

  const tx = await contract.setMessage(msg);
  await tx.wait();

  alert("Message sent!");
  loadData();
}

async function loadData() {
  const message = await contract.getMessage();
  const sender = await contract.lastSender();
  const time = await contract.lastUpdated();

  document.getElementById("latestMessage").innerText = message;
  document.getElementById("lastSender").innerText = sender;
  document.getElementById("lastUpdated").innerText =
    new Date(Number(time) * 1000).toLocaleString();
}
