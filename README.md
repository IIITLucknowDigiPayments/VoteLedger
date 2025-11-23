# VoteLedger 🗳️  
**Modern decentralized voting platform built on Ethereum blockchain with a beautiful UI.**  

## 📌 Overview  
VoteLedger is a next-generation blockchain-powered voting platform with a stunning modern interface.  
It leverages **Ethereum smart contracts** and **Web3 technology** to let users:  
- Connect their MetaMask wallet securely  
- Create polls on-chain with an intuitive interface
- Vote transparently with animated feedback  
- View real-time, verifiable results with beautiful visualizations

---

## 🎯 Problem Statement  
Traditional online voting systems are centralized, insecure, and often lack user-friendly interfaces. Votes can be manipulated, and the user experience is typically outdated.  

---

## 💡 Our Solution  
VoteLedger uses **Ethereum smart contracts** and **modern UI/UX design** to ensure:  
- 🔐 **Secure voting** – Blockchain-verified identity and vote integrity  
- 🛡️ **Data security** – Decentralized data storage on Ethereum  
- 🌍 **Transparency** – All results are verifiable on-chain  
- ⚡ **Beautiful UI** – Modern, animated interface with Framer Motion  
- 🎨 **MetaMask Integration** – Seamless wallet connection with branded buttons

---

## 🚀 Features  
- 🦊 **MetaMask Integration**: Seamless wallet connection with MetaMask branding  
- ✨ **Modern Animations**: Smooth Framer Motion animations throughout  
- 📊 **Create Polls**: Intuitive form with numbered options and validation  
- 🎯 **Browse Polls**: Animated card view with voting statistics  
- 🗳️ **Vote Securely**: Cast your vote with beautiful animated feedback  
- 📈 **Real-time Results**: Animated progress bars and live vote tallies  
- 🎨 **Beautiful UI**: Gradient backgrounds, glassmorphism, and modern design  
- 🌓 **Dark Mode**: Full dark mode support with proper contrast  
- 📱 **Responsive**: Works perfectly on all devices  

---

## 🛠️ Tech Stack  
- **Frontend**: React + TypeScript + Vite  
- **Styling**: TailwindCSS + Custom Gradients  
- **Animations**: Framer Motion  
- **Icons**: Lucide React  
- **Smart Contracts**: Solidity (Ethereum)  
- **Blockchain**: Ethereum (Sepolia Testnet)  
- **Wallet Integration**: ethers.js + MetaMask  
- **Development Tools**: Hardhat

---

## ⚡ Quick Start  

### 1️⃣ Clone the Repo  
```bash
git clone https://github.com/IIITLucknowDigiPayments/VoteLedger
cd VoteLedger
```

### 2️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3️⃣ Install Contract Dependencies
```bash
cd ../contracts
npm install
```

### 4️⃣ Deploy Smart Contracts (Optional)
```bash
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```

### 5️⃣ Run Frontend Locally
```bash
cd ../frontend
npm run dev
```

### 6️⃣ Build for Production
```bash
npm run build
```

### 🔑 Setup MetaMask
1. Install [MetaMask](https://metamask.io/) browser extension
2. Connect to Sepolia testnet
3. Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
4. Click "Connect MetaMask" in the app


## ✨ UI Highlights

- 🎨 **Gradient Design**: Beautiful indigo-to-purple gradients throughout
- 🦊 **MetaMask Button**: Prominent wallet connection with MetaMask logo
- 💫 **Smooth Animations**: Framer Motion powers all transitions
- 🃏 **Card-based Layout**: Modern card design for polls
- 📊 **Animated Charts**: Progress bars animate as votes come in
- 🌈 **Glassmorphism**: Backdrop blur effects for a modern look
- 🎯 **Interactive Elements**: Hover effects and tap animations

## 🔮 Future Vision

- We aim to scale VoteLedger to support:
  - DAO governance voting
  - Corporate board voting
  - Transparent government elections
  - Community decision-making
  - Multi-chain support (Polygon, BSC, etc.)
  - Mobile app with React Native
  - Advanced analytics dashboard

### 🔐 Zero-Knowledge Voting (ZK-Vote)

Implementing **zk-SNARKs** technology to enable fully private voting where users can prove they voted without revealing their vote choice.

**Key Features:**
- 🔒 **Fully Private** - Vote choices remain completely confidential
- 🛡️ **Censorship Resistant** - No one can prevent or track individual votes
- 🎓 **Research-Grade** - Implementing cutting-edge cryptographic techniques

**Technology Stack:**
- **Circom** - Circuit design for zero-knowledge proofs
- **snarkJS** - JavaScript library for zk-SNARKs
- **Semaphore** - Privacy-preserving signaling protocol

This enhancement will make VoteLedger a research-paper worthy platform with state-of-the-art privacy guarantees.

## 📁 Project Structure

```
VoteLedger/
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   │   ├── components/ # UI components with animations
│   │   ├── services/   # Smart contract integration
│   │   └── App.tsx     # Main app component
│   └── package.json
├── contracts/          # Solidity smart contracts
│   ├── contracts/
│   │   └── ShadowVote.sol
│   ├── scripts/        # Deployment scripts
│   └── hardhat.config.ts
└── README.md
```




