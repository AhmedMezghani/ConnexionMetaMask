import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

interface TokenInfoContainerProps {
  // Define any prop types if needed
}

const TokenInfoContainer: React.FC<TokenInfoContainerProps> = () => {
  const { getTokenInfo } = useContext(AppContext);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    balance: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleGetTokenInfo = async () => {
    setLoading(true);
    try {
      const info = await getTokenInfo(contractAddress);
      setTokenInfo(info);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="token-info-container" style={{ border: "2px solid black", padding: "10px" }}>
      <h3 className="token-info-header">Get Token Info</h3>
      <div className="flex-container">
        <label className="label">Contract Address:</label>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="input"
        />
        <button
          onClick={handleGetTokenInfo}
          className="button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Info"}
        </button>
      </div>
      <div className="token-info">
        <h4 className="token-info-item">Name: {tokenInfo.name}</h4>
        <h4 className="token-info-item">Symbol: {tokenInfo.symbol}</h4>
        <h4 className="token-info-item">Balance: {tokenInfo.balance.toString()}</h4>
      </div>
    </div>
  );
};

export default TokenInfoContainer;
