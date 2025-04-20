import { Signer } from "ethers";
import { StreakBadgeNFT__factory } from "../typechain"

export async function redeemBadge(streak: number, signer: Signer): Promise<void> {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  if (!contractAddress) {
    throw new Error("Contract address is not defined in NEXT_PUBLIC_CONTRACT_ADDRESS");
  }

  const factory = new StreakBadgeNFT__factory(signer);
  const contract = factory.attach(contractAddress);

  const tx = await contract.mintBadge(await signer.getAddress(), streak);
  await tx.wait();
}
