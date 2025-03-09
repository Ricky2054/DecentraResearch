# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# DecentraResearch

DecentraResearch is a decentralized platform that leverages blockchain, AI, and smart contracts to ensure academic integrity, facilitate research collaboration, and reward contributors. This project consists of both a backend and a frontend, and it covers several key areas:

- **Blockchain-Based Immutable Research Records:**  
  Research papers are timestamped and stored on the blockchain to guarantee authorship and prevent tampering.

- **NFT-Based Research Ownership:**  
  Papers can be minted as NFTs to establish ownership, allowing authors to license their work and earn fees.

- **Smart Contracts for Citation Rewards:**  
  When a research paper is cited, micropayments are issued directly to the author through smart contracts, ensuring fair recognition.

- **Decentralized Peer Review and Verification:**  
  A peer review system allows researchers to verify papers, check methodologies, citations, and quality, all recorded on-chain.

- **DAO Governance:**  
  The platform is governed by a Decentralized Autonomous Organization (DAO) where researchers can submit proposals, cast votes, and execute decisions that improve the platform.

- **AI-Powered Citation & Plagiarism Detection:**  
  Integration with AI/NLP services enables plagiarism checking, citation validation, and prediction of future research impact and citation counts.

- **IPFS-Based Storage:**  
  Research files (such as PDFs) and metadata are uploaded to IPFS via Infura, ensuring decentralized and secure data storage.

- **Wallet Connection & Web3 Integration:**  
  Users can connect their digital wallets to interact with the blockchain features and manage their profile, papers, and rewards.

## Getting Started

### Prerequisites

- **Backend:**  
  - [Node.js](https://nodejs.org/) (v14 or later)
  - [MongoDB](https://www.mongodb.com/) instance  
  - Environment variables (create a `.env` file in the backend folder) with at least:
    - `MONGODB_URI`  
    - `PORT`  
    - `JWT_SECRET`  
    - `INFURA_PROJECT_ID`  
    - `INFURA_PROJECT_SECRET`  
    - `INFURA_ENDPOINT`
  
- **Frontend:**  
  - [Node.js](https://nodejs.org/)
  - [Vite](https://vitejs.dev/) (bundler for a fast development experience)

### Installation

#### Backend

1. Navigate to the backend folder:
cd decentra-research-backend
2. Install dependencies:
npm install
3. Start the server:
npm run dev

#### Frontend

1. Navigate to the main project folder (where `package.json` for the React/Vite app is located):
cd decentra-research
2. Install dependencies:
npm install
3. Start the development server:
npm run dev

## Dependencies and Usage

### Backend Dependencies

- **Express:** Server framework used to create RESTful APIs.
- **Mongoose:** ODM for interacting with MongoDB.
- **dotenv:** Loads environment variables.
- **cors:** Enables Cross-Origin Resource Sharing.
- **jsonwebtoken:** For authentication and token verification.
- **ipfs-http-client:** To interact with the IPFS network via Infura.
- **helmet:** Adds security-related HTTP headers.
- **nodemon:** For development auto-reloads on file changes.

### Frontend Dependencies

- **React & ReactDOM:** Frontend UI library.
- **Vite:** Build tool for quick development startup.
- **Bootstrap & React-Bootstrap:** For responsive and styled UI components.
- **React Router DOM:** For client-side routing.
- **@reduxjs/toolkit & react-redux:** For state management.
- **@web3-react/core & @web3-react/injected-connector:** For wallet connection and blockchain interactions.
- **ethers:** Library to interact with Ethereum blockchain.
- **axios:** To make HTTP requests to the backend and AI service APIs.

## Project Structure

- **Backend:**  
  - `/config` – Database configuration.
  - `/controllers` – API endpoint controllers (e.g., research, user, citation handling).
  - `/models` – Mongoose schemas (Research, User, Citation, Review).
  - `/middleware` – Custom middleware functions (authentication, async handling, error handling).
  - `/routes` – API route definitions including research, citations, reviews, users.
  - `/services` – Integration with IPFS, AI services, blockchain interactions.
  - `/contracts` – Solidity smart contracts for NFT, DAO, and citation rewards.

- **Frontend:**  
  - `/src`  
 - `/components` – Reusable React components (layout, blockchain wallet connector).
 - `/pages` – Page-level components (HomePage, SubmitResearchPage, DAOPage, etc.).
 - `/services` – Web3 blockchain connectors, IPFS integration, AI service calls.
 - `/store` – Redux state management slices.
 - Entry points and configuration files (main.jsx, App.jsx, vite.config.js).

## How to Use

- **Submitting Research:**  
  Authors can submit research papers via the *Submit Research* page. The PDF is uploaded to IPFS, metadata is generated and also stored on IPFS, and then a Research NFT is minted.

- **Verifying Research:**  
  Reviewers can use the *Verify & Review* page to assess papers and add their verification, which is recorded to boost the reputation of both the paper and the reviewer.

- **Marketplace:**  
  The *Research Marketplace* page displays submitted papers where users can view details, purchase access to research, or check citations.

- **DAO Governance:**  
  On the *DAO Governance* page, users can create proposals for platform improvements, cast votes, and execute proposals once voting has ended.

- **Wallet Connection:**  
  Users connect their digital wallet (via MetaMask or similar) using the Wallet Connector component available in the header to access blockchain features.

- **AI Checks:**  
  The AI services (plagiarism check, citation validation, citation prediction) are integrated on pages like Submit Research and Research Details to offer users insights and alerts.

## Contributing

Feel free to fork the project and submit pull requests. When contributing, please ensure your code follows the established ESLint rules and formatting guidelines.

## License

This project is licensed under the MIT License.