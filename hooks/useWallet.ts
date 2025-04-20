import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers, Signer } from "ethers";

export interface UseWalletResult {
    provider: ethers.BrowserProvider | null;
    signer: Signer | null;
    address: string | null;
    connectWallet: () => Promise<void>;
  }

export function useWallet(): UseWalletResult {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner]       = useState<Signer | null>(null);
  const [address, setAddress]     = useState<string | null>(null);

  async function connectWallet() {
    const web3Modal = new Web3Modal({
      network: "arbitrum-goerli",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const web3Prov = new ethers.BrowserProvider(connection);
    const signerInst = await web3Prov.getSigner();
    const addr       = await signerInst.getAddress();

    setProvider(web3Prov);
    setSigner(signerInst);
    setAddress(addr);
  }

  return { provider, signer, address, connectWallet };
}
