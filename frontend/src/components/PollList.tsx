import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface Poll {
  id: string;
  question: string;
  options: string[];
  counts: number[];
  isActive: boolean;
  creator: string;
}

interface PollListProps {
  polls: Poll[];
  onOpen: (id: string) => void;
  isLoading: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PollList({ polls, onOpen, isLoading }: PollListProps) {
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Available Polls</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
          />
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading polls...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Available Polls</h2>
      </div>
      
      {polls.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">No polls found yet</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Create the first one to get started!</p>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {polls.map((poll) => {
            const totalVotes = poll.counts.reduce((a, b) => a + b, 0);
            return (
              <motion.div 
                key={poll.id}
                variants={item}
                whileHover={{ scale: 1.02, y: -4 }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => onOpen(poll.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3">
                      {poll.question}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">{totalVotes} votes</span>
                      </div>
                      
                      {poll.isActive ? (
                        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="font-medium">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                          <XCircle className="w-4 h-4" />
                          <span className="font-medium">Ended</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen(poll.id);
                    }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    View Poll
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}