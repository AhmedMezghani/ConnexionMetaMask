import React, { useState,useContext } from "react";
import { AppContext } from "../context/AppContext";
interface TokenTransfertProps {
  // Define any prop types if needed
}

const TokenTransfert: React.FC<TokenTransfertProps> = () => {
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amountToSend, setAmountToSend] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { transferToken } = useContext(AppContext);

  const handleTransferToken = async () => {
    setLoading(true);

    try {
      // Ensure recipient address and amount are provided
      if (!recipientAddress || amountToSend <= 0) {
        throw new Error("Please provide a valid recipient address and amount.");
      }

      // Call the transferToken function from AppContext
      await transferToken(tokenAddress,recipientAddress, amountToSend);

      // You may want to update any other UI or state upon successful transfer
      console.log(`Transferred ${amountToSend} tokens to ${recipientAddress}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="token-info" style={{ border: "2px solid black", padding: "10px" }}>
      <h3 className="token-info-header">Transfer ERC-20 Token</h3>
      <div className="flex-container" style={{ flexDirection: "column" }}>
        <label className="label">token ERC-20:</label>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="input"
        />
        <label className="label">Recipient Address:</label>

        <input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="input"
        />
        <label className="label">Amount:</label>
        <input
          type="number"
          value={amountToSend}
          onChange={(e) => setAmountToSend(Number(e.target.value))}
          className="input"
        />
        <button
          onClick={handleTransferToken}
          className="button"
          disabled={loading}
        >
          {loading ? "Transferring..." : "Transfer"}
        </button>
      </div>
    </div>
  );
};

export default TokenTransfert;
