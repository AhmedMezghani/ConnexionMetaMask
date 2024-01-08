## Project Setup

This project is a Next.js application that connects to a user's Ethereum wallet via MetaMask, retrieves information about ERC-20 tokens, and allows for the transfer of tokens. Follow the steps below to set up and run the project:

### Prerequisites
- Node.js and npm installed on your machine.
- MetaMask browser extension installed.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AhmedMezghani/ConnexionMetaMask
   cd your-repo
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

   If you encounter any issues with dependencies, you can force the installation with:
   ```bash
   npm install --force
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

   This command will start the development server, and you can access the application at `http://localhost:3000` in your browser.

4. **Connect MetaMask:**
   - Open MetaMask in your browser.
   - Ensure that MetaMask is set to the Ethereum network.
   - Connect your wallet by clicking the "Connexion au Portefeuille" button in the application.

### Project Structure

- **`/pages/index.tsx`**: The main page component (`Home`) that handles the MetaMask connection and includes the `TokenInfoContainer` and `TokenTransfert` components.

- **`/components/TokenInfoContainer.tsx`**: Component for retrieving and displaying information about ERC-20 tokens.

- **`/components/TokenTransfert.tsx`**: Component for transferring ERC-20 tokens to another address.

- **`/context/AppContext.tsx`**: The context provider (`AppProvider`) that manages the connection to MetaMask and exposes functions for getting token information and transferring tokens.

### Technical Explanation

- **Web3 and Ethereum Connection:**
  - The project uses the `Web3` library to interact with the Ethereum blockchain.
  - MetaMask is used as the provider for the Ethereum connection.
  - The `ethereum` object is accessed from the `window` and used to request accounts and listen for changes.

- **Token Information Retrieval:**
  - The `getTokenInfo` function in `AppContext` uses the ERC-20 contract ABI and the contract address to fetch the name, symbol, and balance of the user.

- **Token Transfer:**
  - The `transferToken` function in `AppContext` allows the user to transfer ERC-20 tokens to another address. It uses the contract ABI and address to interact with the contract's `transfer` function.

- **Error Handling:**
  - The `error` state in `AppContext` is used to handle and display errors throughout the application.

Feel free to explore and modify the code based on your needs. If you encounter any issues or have questions, please refer to the documentation of the libraries used and the Ethereum development community for assistance.