import * as React from 'react';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

interface ConnectWalletProps {
  onConnect: (address: string, provider: ethers.BrowserProvider) => void;
}

export default function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== 'undefined') {
      setIsMetaMaskInstalled(!!window.ethereum?.isMetaMask);
    }

    // Add event listener for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          console.log('Wallet disconnected');
          window.location.reload();
        }
      };

      const handleChainChanged = () => {
        // Reload the page when the chain changes
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        // Clean up listeners
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const installMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const connectWallet = async () => {
    setConnecting(true);
    setError(null);

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask not detected. Please install MetaMask extension.");
      }

      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      // Check if we're on a testnet
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      // If not on a test network, request to switch to Sepolia testnet
      if (chainId === 1) {
        try {
          // Try to switch to Sepolia (chainId 11155111)
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xAA36A7' }], // 11155111 in hex
          });
          // Refresh the provider after switching
          setError(null);
          return connectWallet(); // Try connecting again after switching
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0xAA36A7',
                    chainName: 'Sepolia Test Network',
                    nativeCurrency: {
                      name: 'Sepolia ETH',
                      symbol: 'ETH',
                      decimals: 18
                    },
                    rpcUrls: ['https://rpc.sepolia.org'],
                    blockExplorerUrls: ['https://sepolia.etherscan.io']
                  }
                ],
              });
              return connectWallet(); // Try connecting again after adding
            } catch (addError) {
              throw new Error("Failed to add Sepolia testnet to MetaMask");
            }
          }
          throw switchError;
        }
      }
      
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      onConnect(address, provider);
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {isMetaMaskInstalled ? (
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={connectWallet}
          disabled={connecting}
          className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
            alt="MetaMask"
            className="w-6 h-6"
          />
          <span>{connecting ? "Connecting..." : "Connect MetaMask"}</span>
        </motion.button>
      ) : (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">MetaMask not detected</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={installMetaMask}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask"
              className="w-5 h-5"
            />
            Install MetaMask
          </motion.button>
        </motion.div>
      )}
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-2 rounded-lg mt-2"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}