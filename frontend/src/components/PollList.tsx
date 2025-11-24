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
        className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-950/70"
      >
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Live registry</span>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Available polls</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Fetching ballots from the on-chain registry...</p>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-indigo-500"
          />
          <p className="mt-4 text-slate-500 dark:text-slate-300">Loading polls...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-950/70"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Available polls</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300">Browse every verifiable ballot currently open.</p>
          </div>
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
          Registry refreshed in realtime
        </div>
      </div>
      
      {polls.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <div className="rounded-3xl border border-dashed border-slate-200/80 p-10 dark:border-white/15">
            <Clock className="mx-auto mb-4 h-16 w-16 text-slate-400" />
            <p className="text-lg font-medium text-slate-900 dark:text-white">No polls yet</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Launch the first ballot to get your workspace moving.</p>
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
                whileHover={{ scale: 1.01, y: -2 }}
                className="cursor-pointer rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-lg shadow-slate-900/5 transition-all dark:border-white/10 dark:bg-slate-900/70"
                onClick={() => onOpen(poll.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                      {poll.question}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">{totalVotes} votes</span>
                      </div>
                      
                      {poll.isActive ? (
                        <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="font-medium">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-500 dark:bg-white/10 dark:text-slate-300">
                          <XCircle className="w-4 h-4" />
                          <span className="font-medium">Ended</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen(poll.id);
                    }}
                    type="button"
                    className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 dark:border-white/20 dark:text-slate-200"
                  >
                    View poll
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