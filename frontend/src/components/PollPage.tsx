import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, XCircle, User, TrendingUp } from 'lucide-react';

interface Poll {
  id: string;
  question: string;
  options: string[];
  counts: number[];
  isActive: boolean;
  creator: string;
}

interface PollPageProps {
  poll: Poll | null;
  isLoading: boolean;
  onVote: (pollId: string, choice: number) => Promise<void>;
  isVoting: boolean;
  error: string | null;
  currentAccount?: string;
}

export default function PollPage({
  poll,
  isLoading,
  onVote,
  isVoting,
  error,
  currentAccount
}: PollPageProps) {
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
          />
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading poll...</p>
        </div>
      </motion.div>
    );
  }

  if (!poll) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center"
      >
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Poll Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The requested poll could not be found.</p>
      </motion.div>
    );
  }

  const totalVotes = poll.counts.reduce((a, b) => a + b, 0);
  const isCreator = currentAccount && currentAccount.toLowerCase() === poll.creator.toLowerCase();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{poll.question}</h2>
          {poll.isActive ? (
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-full">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">Ended</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          {isCreator && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">Created by you</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Total Votes: {totalVotes}</span>
          </div>
        </div>
      </div>

      {/* Poll Options */}
      <div className="space-y-5">
        {poll.options.map((option, index) => {
          const voteCount = poll.counts[index] || 0;
          const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold text-gray-800 dark:text-white">{option}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {voteCount} votes
                  </span>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {percentage}%
                  </span>
                </div>
              </div>
              
              <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                />
              </div>
              
              {poll.isActive && currentAccount && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onVote(poll.id, index)}
                  disabled={isVoting}
                  className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVoting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Voting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Vote for this option
                    </span>
                  )}
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Messages */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl"
        >
          {error}
        </motion.div>
      )}
      
      {!currentAccount && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <BarChart3 className="w-5 h-5" />
          Connect your wallet to vote on this poll.
        </motion.div>
      )}
      
      {!poll.isActive && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <XCircle className="w-5 h-5" />
          This poll has ended and is no longer accepting votes.
        </motion.div>
      )}
    </motion.div>
  );
}