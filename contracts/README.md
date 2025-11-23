# ShadowVote Smart Contracts 🗳️

Solidity smart contracts for the ShadowVote decentralized voting platform.

## 📋 Overview

This directory contains the Ethereum smart contracts that power ShadowVote's on-chain voting functionality. The contracts are written in Solidity and use Hardhat for development, testing, and deployment.

## 🏗️ Contract Architecture

### ShadowVote.sol

The main voting contract with the following features:

#### Core Functionality
- ✅ **Create Polls**: Create polls with multiple options and optional time limits
- ✅ **Cast Votes**: Anonymous voting with double-vote prevention
- ✅ **View Results**: Real-time vote counting and results
- ✅ **Poll Management**: Close or extend polls (creator/owner only)

#### Key Functions

**Creating Polls**
```solidity
function createPoll(
    string calldata question,
    string[] calldata options,
    uint256 duration  // in seconds, 0 for unlimited
) external returns (uint64 pollId)
```

**Voting**
```solidity
function vote(uint64 pollId, uint32 choice) external
```

**Querying Polls**
```solidity
function getPoll(uint64 pollId) external view returns (...)
function getActivePolls() external view returns (uint64[] memory)
function getPollResults(uint64 pollId) external view returns (...)
```

**Poll Management**
```solidity
function closePoll(uint64 pollId) external
function extendPoll(uint64 pollId, uint256 additionalTime) external
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- MetaMask or another Web3 wallet

### Installation

1. **Navigate to contracts directory**
```bash
cd contracts
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `PRIVATE_KEY`: Your wallet private key for deployment
- `SEPOLIA_RPC_URL`: Your Ethereum Sepolia testnet RPC URL (e.g., from Alchemy or Infura)
- `ETHERSCAN_API_KEY`: Your Etherscan API key for contract verification

### Compilation

Compile the smart contracts:

```bash
npm run compile
```

This generates:
- Contract artifacts in `artifacts/`
- TypeScript types in `typechain-types/`

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Generate coverage report:

```bash
npm run coverage
```

## 🚢 Deployment

### Local Development

1. **Start a local Hardhat node**
```bash
npm run node
```

2. **Deploy to local network** (in another terminal)
```bash
npm run deploy
```

### Testnet Deployment (Sepolia)

1. **Ensure you have testnet ETH** 
   - Get Sepolia ETH from faucets like:
     - https://sepoliafaucet.com/
     - https://www.alchemy.com/faucets/ethereum-sepolia

2. **Deploy to Sepolia**
```bash
npm run deploy:sepolia
```

3. **Verify contract on Etherscan**
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

### Mainnet Deployment

⚠️ **WARNING**: Deploying to mainnet costs real ETH. Ensure thorough testing first.

```bash
npm run deploy:mainnet
```

## 📁 Project Structure

```
contracts/
├── ShadowVote.sol          # Main voting contract
├── ShadowVote.compact      # Legacy Compact version (deprecated)
├── hardhat.config.ts       # Hardhat configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── scripts/
│   ├── deploy.ts          # Deployment script
│   └── interact.ts        # Contract interaction examples
├── test/                  # Test files (to be added)
├── deployments/           # Deployment records
└── artifacts/            # Compiled contracts (generated)
```

## 🔧 Configuration

### Hardhat Networks

The project is configured for the following networks:

- **hardhat**: Local development network
- **localhost**: Local Hardhat node
- **sepolia**: Ethereum Sepolia testnet
- **mainnet**: Ethereum mainnet

Network configurations can be modified in `hardhat.config.ts`.

## 📊 After Deployment

After deploying the contract, you need to:

1. **Update the frontend** with the new contract address:
   - Open `frontend/src/services/ShadowVoteService.ts`
   - Update `CONTRACT_ADDRESS` with your deployed address

2. **The deployment script automatically**:
   - Exports the contract ABI to `frontend/src/contracts/ShadowVote.json`
   - Saves deployment info to `deployments/latest.json`

## 🔍 Contract Verification

Verify your contract on Etherscan for transparency:

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## 💡 Usage Examples

See `scripts/interact.ts` for examples of:
- Creating polls
- Casting votes
- Querying poll data
- Managing polls

Run the interaction script:

```bash
npx hardhat run scripts/interact.ts --network <network>
```

## 🔐 Security Considerations

- ✅ Double-vote prevention using address mapping
- ✅ Input validation on all functions
- ✅ Access control for administrative functions
- ✅ Safe arithmetic (Solidity 0.8+)
- ✅ Event emissions for transparency

### Recommendations

- Use a hardware wallet for mainnet deployments
- Never commit your `.env` file
- Audit contracts before mainnet deployment
- Test thoroughly on testnets first
- Consider formal verification for critical functions

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile contracts |
| `npm test` | Run tests |
| `npm run coverage` | Generate coverage report |
| `npm run clean` | Clean artifacts and cache |
| `npm run node` | Start local Hardhat node |
| `npm run deploy` | Deploy to local network |
| `npm run deploy:sepolia` | Deploy to Sepolia testnet |
| `npm run deploy:mainnet` | Deploy to Ethereum mainnet |

## 📝 Smart Contract Features

### Decentralization Features

1. **On-chain Storage**: All poll data stored on blockchain
2. **Transparent Voting**: Vote counts publicly verifiable
3. **Immutable Records**: Historical data cannot be altered
4. **No Central Authority**: Anyone can create polls
5. **Permissionless**: No approval needed to participate

### Privacy Considerations

⚠️ **Note**: While votes are recorded on-chain, the current implementation does NOT provide full anonymity as voter addresses are visible in transaction history. For true privacy:

- Consider implementing zk-SNARKs (zero-knowledge proofs)
- Use commit-reveal schemes
- Implement ring signatures
- Use privacy-focused L2 solutions

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**"Insufficient funds" error**
- Ensure your wallet has enough ETH for gas fees
- For testnets, use faucets to get free test ETH

**"Nonce too high" error**
- Reset your wallet's transaction history in MetaMask
- Or wait for pending transactions to complete

**Contract verification fails**
- Ensure the compiler version matches
- Check that all constructor arguments are correct
- Verify you're using the correct network

## 🔗 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review Hardhat troubleshooting guides

---

Built with ❤️ for decentralized governance
