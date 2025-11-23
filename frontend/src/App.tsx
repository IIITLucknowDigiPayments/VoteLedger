import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { Vote, PlusCircle, Home, LogOut } from 'lucide-react';
import ConnectWallet from './components/ConnectWallet';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import PollPage from './components/PollPage';
import NotConnectedMessage from './components/NotConnectedMessage';
import { ShadowVoteService } from './services/ShadowVoteService';
import type { Poll } from './services/ShadowVoteService';
import './App.css';

function App() {
  // Wallet connection state
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [service, setService] = useState<ShadowVoteService | null>(null);
  
  // Application state
  const [view, setView] = useState<'list' | 'create' | 'poll'>('list');
  const [selectedPollId, setSelectedPollId] = useState<string | null>(null);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPoll, setIsCreatingPoll] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);
  
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Initialize and load polls when provider changes
  useEffect(() => {
    if (provider) {
      try {
        const shadowVoteService = new ShadowVoteService(provider);
        setService(shadowVoteService);
        
        // Load all polls
        loadPolls(shadowVoteService);
      } catch (err) {
        console.error("Failed to initialize service:", err);
        setError("Failed to connect to the blockchain. Please check your connection and try again.");
        setIsLoading(false);
      }
    }
  }, [provider]);

  // Load poll details when a poll is selected
  useEffect(() => {
    if (service && selectedPollId) {
      loadPollDetails(selectedPollId);
    }
  }, [service, selectedPollId]);

  const handleConnect = (address: string, providerInstance: ethers.BrowserProvider) => {
    setAccount(address);
    setProvider(providerInstance);
  };

  const loadPolls = async (serviceInstance: ShadowVoteService) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const allPolls = await serviceInstance.getAllPolls();
      setPolls(allPolls);
    } catch (err) {
      console.error("Failed to load polls:", err);
      setError("Failed to load polls. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPollDetails = async (pollId: string) => {
    if (!service) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const poll = await service.getPoll(pollId);
      setSelectedPoll(poll);
      setView('poll');
    } catch (err) {
      console.error("Failed to load poll details:", err);
      setError("Failed to load poll details. The poll may not exist.");
      setView('list');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePoll = async (question: string, options: string[]) => {
    if (!service || !account) return;
    
    setIsCreatingPoll(true);
    setError(null);
    
    try {
      await service.createPoll(question, options);
      // Reload polls after creating a new one
      await loadPolls(service);
      setView('list');
    } catch (err) {
      console.error("Failed to create poll:", err);
      setError("Failed to create poll. Please try again.");
    } finally {
      setIsCreatingPoll(false);
    }
  };

  const handleVote = async (pollId: string, choice: number) => {
    if (!service || !account) return;
    
    setIsVoting(true);
    setError(null);
    
    try {
      await service.vote(pollId, choice);
      // Reload poll details after voting
      await loadPollDetails(pollId);
    } catch (err) {
      console.error("Failed to cast vote:", err);
      setError("Failed to cast vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const handleOpenPoll = (pollId: string) => {
    setSelectedPollId(pollId);
  };

  const handleNavigate = (newView: 'list' | 'create' | 'poll') => {
    setView(newView);
    if (newView === 'list' && service) {
      loadPolls(service);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    setProvider(null);
    setService(null);
    setView('list');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                VoteLedger
              </h1>
            </motion.div>
            
            <div className="flex items-center gap-4">
              {account ? (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-full shadow-lg">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                      alt="MetaMask"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">
                      {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDisconnect}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    title="Disconnect"
                  >
                    <LogOut className="w-5 h-5 text-red-500" />
                  </motion.button>
                </motion.div>
              ) : (
                <ConnectWallet onConnect={handleConnect} />
              )}
            </div>
          </div>
        </div>
      </motion.header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate('list')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-md ${
              view === 'list' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/50' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-lg'
            }`}
          >
            <Home className="w-5 h-5" />
            All Polls
          </motion.button>
          
          {account && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate('create')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-md ${
                view === 'create' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/50' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-lg'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              Create Poll
            </motion.button>
          )}
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {!account && view !== 'poll' && (
            <NotConnectedMessage />
          )}
          
          {view === 'list' && (
            <PollList 
              polls={polls} 
              onOpen={handleOpenPoll}
              isLoading={isLoading} 
            />
          )}
          
          {view === 'create' && account && (
            <CreatePoll 
              onCreate={handleCreatePoll}
              isCreating={isCreatingPoll} 
            />
          )}
          
          {view === 'poll' && (
            <PollPage
              poll={selectedPoll}
              isLoading={isLoading}
              onVote={handleVote}
              isVoting={isVoting}
              error={error}
              currentAccount={account || undefined}
            />
          )}
        </motion.div>
      </main>
      
      <footer className="mt-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            VoteLedger — Secure & Transparent Blockchain Voting
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Powered by Ethereum & Web3
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
