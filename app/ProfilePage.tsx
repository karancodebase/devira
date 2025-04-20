import React, { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { redeemBadge } from "../utils/redeemBadge";

interface ProfilePageProps {
  streak: number;
  badgeClaimed: boolean;
}

export default function ProfilePage({ streak, badgeClaimed }: ProfilePageProps) {
  const { address, connectWallet, signer } = useWallet();
  const [canRedeem, setCanRedeem]          = useState(false);

  useEffect(() => {
    setCanRedeem((streak === 30 || streak === 50) && !badgeClaimed);
  }, [streak, badgeClaimed]);

  return (
    <div>
      <p>GitHub Streak: {streak} days</p>
      {canRedeem && (
        address
          ? <button onClick={() => redeemBadge(streak, signer!)}>Redeem Badge</button>
          : <button onClick={connectWallet}>Connect Wallet to Redeem</button>
      )}
    </div>
  );
}
