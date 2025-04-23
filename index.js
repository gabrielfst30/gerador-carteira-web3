import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

//Conectando a sepholia com o alchemy provider
const provider = new ethers.JsonRpcProvider(
  `${process.env.API_KEY_TEST_NETWORK}`
);
console.log(provider);

async function main() {
  const blockNumber = await provider.getBlockNumber();
  console.log("Block Number:", blockNumber);

  //Criando uma nova carteira
  // const wallet = ethers.Wallet.fromPhrase(mnemonic, provider);

  //Gerando um mnemonic válido e criando uma carteira
  const wallet = ethers.Wallet.createRandom();

  console.log("Generated Mnemonic: ", wallet.mnemonic.phrase);
  console.log("Wallet Address: ", wallet.address);
  console.log("Private Key: ", wallet.privateKey);

  //Criando uma senha
  const password = "qualquercoisa";

  //Criptografando senha
  const encrypted = await wallet.encrypt(password);
  //  console.log(encrypted)

  //Criando signer com chave privada
  const walletSigner = new ethers.Wallet(process.env.PRIVATE_KEY);
  console.log(walletSigner.address);

  //Conectando a carteira metamask ao provedor alchemy
  const signer = walletSigner.connect(provider);

  // Pegando o saldo da carteira conectada
  const balanceSigner = await provider.getBalance(signer.address);
  console.log("balanceSigner: ", ethers.formatEther(balanceSigner));
}

main();
