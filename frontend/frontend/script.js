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
      {"internalType":"string","type":"string"},
      {"internalType":"address","type":"address"},
      {"internalType":"uint256","type":"uint256"}
    ],
    "stateMutability":"view",
    "type":"function"
  }
];

let provider, signer, contract;

async function connectWallet() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  document.getElementById("account").innerText =
    await signer.getAddress();

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
  alert("Message saved");
}

async function getMessage() {
  const res = await contract.getMessage();
  document.getElementById("output").innerText = res[0];
}
