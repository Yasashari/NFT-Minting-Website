let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

// connect metamask with dapp
async function connectmetamask() {
  // metamask requires reqesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address: ", await signer.getAddress());
  document.getElementById("label2").innerHTML = await signer.getAddress();
}

const NFTcontractaddress = "0x04c75A4FD5782AD1fDc4DD30045D853A6BBB0dcC";

const NFTABI = ["function mint(address _to, uint256 _mintAmount) public payable", "function maxSupply() view returns(uint)"];

async function mint() {
  const NFTcontract = new ethers.Contract(NFTcontractaddress, NFTABI, provider);
  let nftamount = document.getElementById("input1").value;
  let etheramount = (nftamount * 1e14).toString();
  console.log(etheramount);
  let tx1 = await NFTcontract.maxSupply();
  console.log(tx1.toString());
  let myaddr = await signer.getAddress();
  const tx = await NFTcontract.connect(signer).mint(myaddr, nftamount, { value: etheramount });
}
