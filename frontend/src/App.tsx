import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import PollPage from './components/PollPage';
import NotConnectedMessage from './components/NotConnectedMessage';
import { ShadowVoteService } from './services/ShadowVoteService';
import type { Poll } from './services/ShadowVoteService';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';
import ThreeScene from './components/ThreeScene';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [service, setService] = useState<ShadowVoteService | null>(null);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPoll, setIsCreatingPoll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPolls = useCallback(async (serviceInstance: ShadowVoteService) => {
    setIsLoading(true);
    setError(null);

    try {
      const allPolls = await serviceInstance.getAllPolls();
      setPolls(allPolls);
    } catch (err) {
      console.error('Failed to load polls:', err);
      setError('Failed to load polls. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!provider) {
      setService(null);
      setPolls([]);
      setIsLoading(false);
      return;
    }

    try {
      const shadowVoteService = new ShadowVoteService(provider);
      setService(shadowVoteService);
      loadPolls(shadowVoteService);
    } catch (err) {
      console.error('Failed to initialize service:', err);
      setError('Failed to connect to the blockchain. Please check your connection and try again.');
      setIsLoading(false);
    }
  }, [provider, loadPolls]);

  const handleCreatePoll = async (question: string, options: string[]) => {
    if (!service || !account) {
      setError('Connect your wallet before creating a poll.');
      return;
    }

    setIsCreatingPoll(true);
    setError(null);

    try {
      await service.createPoll(question, options);
      await loadPolls(service);
      navigate('/polls');
    } catch (err) {
      console.error('Failed to create poll:', err);
      setError('Failed to create poll. Please try again.');
    } finally {
      setIsCreatingPoll(false);
    }
  };

  const handleVote = async (pollId: string, choice: number) => {
    if (!service || !account) {
      throw new Error('Connect your wallet before voting.');
    }

    await service.vote(pollId, choice);
  };

  const handleOpenPoll = (pollId: string) => {
    navigate(`/polls/${pollId}`);
  };

  const handleDisconnect = () => {
    setAccount(null);
    setProvider(null);
    setService(null);
    setPolls([]);
    setError(null);
    navigate('/');
  };

  const handleConnectFromNavbar = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use VoteLedger');
      return;
    }

    try {
      const providerInstance = new ethers.BrowserProvider(window.ethereum);
      const accounts = await providerInstance.send('eth_requestAccounts', []);

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setProvider(providerInstance);
      }
    } catch (connectionError) {
      console.error('Failed to connect wallet:', connectionError);
    }
  };

  return (
    <div className="app-shell min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 relative">
      <ThreeScene />

      <Navbar
        account={account}
        onDisconnect={handleDisconnect}
        onConnect={handleConnectFromNavbar}
      />

      <main className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-6xl space-y-12"
        >
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/polls"
              element={(
                <div className="space-y-6">
                  {!account && <NotConnectedMessage />}
                  <PollList polls={polls} onOpen={handleOpenPoll} isLoading={isLoading} />
                </div>
              )}
            />
            <Route
              path="/create"
              element={
                account ? (
                  <CreatePoll onCreate={handleCreatePoll} isCreating={isCreatingPoll} />
                ) : (
                  <NotConnectedMessage />
                )
              }
            />
            <Route
              path="/polls/:pollId"
              element={<PollPageRoute service={service} account={account} onVote={handleVote} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

interface PollPageRouteProps {
  service: ShadowVoteService | null;
  account: string | null;
  onVote: (pollId: string, choice: number) => Promise<void>;
}

function PollPageRoute({ service, account, onVote }: PollPageRouteProps) {
  const { pollId } = useParams<{ pollId: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPollDetails = useCallback(async () => {
    if (!service || !pollId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedPoll = await service.getPoll(pollId);
      setPoll(fetchedPoll);
    } catch (err) {
      console.error('Failed to load poll details:', err);
      setError('Failed to load poll details. The poll may not exist.');
    } finally {
      setIsLoading(false);
    }
  }, [service, pollId]);

  useEffect(() => {
    loadPollDetails();
  }, [loadPollDetails]);

  const handleVoteClick = async (pollIdentifier: string, choice: number) => {
    setIsVoting(true);
    setError(null);

    try {
      await onVote(pollIdentifier, choice);
      await loadPollDetails();
    } catch (err) {
      console.error('Failed to cast vote:', err);
      setError('Failed to cast vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  if (!pollId) {
    return <Navigate to="/polls" replace />;
  }

  if (!account) {
    return <NotConnectedMessage />;
  }

  return (
    <PollPage
      poll={poll}
      isLoading={isLoading}
      onVote={handleVoteClick}
      isVoting={isVoting}
      error={error}
      currentAccount={account || undefined}
    />
  );
}

export default App;
