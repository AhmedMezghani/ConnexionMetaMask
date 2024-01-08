// Import any other necessary dependencies
import { useContext ,useState} from "react";
import { AppContext } from "../context/AppContext";
import TokenInfoContainer from "./TokenInfoContainer";
import TokenTransfert from "./tokenTransfert";

interface HomeProps {
  // Define any prop types if needed
}

const Home: React.FC<HomeProps> = () => {
  const { account, connectWallet, error } = useContext(AppContext);
  
  
  



  return (
    <div className="container">
      <div className="box">
        <h2>
          MetaMask <span className="block">Connect.</span>
        </h2>

        {account ? (
          <div className="account-box">
            <p className="shadow-border">{account}</p>
          </div>
        ) : (
          <button className="btn shadow-border" onClick={connectWallet}>
            Connexion au Portefeuille
          </button>
        )}

        {error && <p className={`error shadow-border`}>{`Error: ${error}`}</p>}
      </div>
      <TokenInfoContainer />
      <TokenTransfert />
    </div>
  );
};

export default Home;
