import React, { createContext, useEffect, useState, ReactNode } from "react";
import Web3 from "web3"; // Import Web3 library or ethers.js if you prefer
import ABI from "../ABI.json";


interface AppContextProps {
  account: string;
  connectWallet: () => void;
  error: string;
  getTokenInfo: (contractAddress: string) => Promise<TokenInfo>;
  transferToken: (tokenAddress:string,recipientAddress: string, amount: number) => Promise<void>;

}
interface TokenInfo {
  name: string;
  symbol: string;
  balance: number;
}
export const AppContext = createContext<AppContextProps>({
  account: "",
  connectWallet: () => {},
  error: "",
  getTokenInfo: async () => ({ name: "", symbol: "", balance: 0 }),
  transferToken: async (tokenAddress:string,recipientAddress: string, amount: number) => {
    throw new Error("transferToken function not implemented yet");
  },

  
});

interface AppProviderProps {
  children: ReactNode;
}

interface CustomWindow extends Window {
  ethereum?: any;
}

const { ethereum } = (typeof window !== "undefined" ? window : {}) as CustomWindow;

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    name: "",
    symbol: "",
    balance: 0,
  });
  const checkEthereumExists = (): boolean => {
    if (!ethereum) {
      setError("Please Install MetaMask.");
      return false;
    }
    return true;
  };

  const getConnectedAccounts = async (): Promise<void> => {
    setError("");
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts);
      setAccount(accounts[0]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const connectWallet = async (): Promise<void> => {
    setError("");
    if (checkEthereumExists()) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setAccount(accounts[0]);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };
  const getTokenInfo = async (contractAddress: string): Promise<TokenInfo> => {
    try {
      // Initialize Web3 or ethers.js
      console.log("getTokenInfo");
      const web3 = new Web3(ethereum);
      
      const erc20Contract = new web3.eth.Contract(ABI, contractAddress);
      
      // Replace 'MyToken' and 'MySymbol' with actual contract functions
      const name : string = await erc20Contract.methods.name().call();
      const symbol: string = await erc20Contract.methods.symbol().call();

      // Replace 'getBalance' with the actual function to get user balance
      const balance : number= await erc20Contract.methods.balanceOf(contractAddress).call();
      console.log(name);

      console.log(symbol);

      console.log(balance);
      return {
        name,
        symbol,
        balance,
      };
    } catch (err) {
      setError((err as Error).message);
      return { name: "", symbol: "", balance: 0 };
    }
  };
  const transferToken = async (tokenAddress:string, recipientAddress: string, amount: number): Promise<void> => {
    try {
      const web3 = new Web3(ethereum);
      
      const erc20Contract = new web3.eth.Contract(ABI, tokenAddress);
      
      // Replace 'transfer' with the actual function to transfer tokens
      await erc20Contract.methods.transfer(recipientAddress, amount).send({ from: account });

      // Update token info or any other state as needed
    } catch (err) {
      setError((err as Error).message);
    }
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      if (checkEthereumExists()) {
        ethereum.on("accountsChanged", getConnectedAccounts);
        getConnectedAccounts();
      }
      return () => {
        ethereum.removeListener("accountsChanged", getConnectedAccounts);
      };
    }
  }, []);

  return (
    <AppContext.Provider value={{ account, connectWallet, error, getTokenInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
