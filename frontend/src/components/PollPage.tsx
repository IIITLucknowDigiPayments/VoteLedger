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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/70 bg-white/95 p-8 shadow-2xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/70"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),320px]">
        <section>
          <div className="mb-8 space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{poll.question}</h2>
              <div>
                {poll.isActive ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> Active
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                    <XCircle className="h-4 w-4" /> Ended
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Total votes: {totalVotes}
              </span>
              {isCreator && (
                <span className="inline-flex items-center gap-2">
                  <User className="h-4 w-4" /> Created by you
                </span>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {poll.options.map((option, index) => {
              const voteCount = poll.counts[index] || 0;
              const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-inner shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/60"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">{option}</span>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-300">
                      <span>{voteCount} votes</span>
                      <span className="text-base font-semibold text-indigo-600 dark:text-indigo-400">{percentage}%</span>
                    </div>
                  </div>
                  <div className="relative h-2.5 w-full rounded-full bg-slate-200 dark:bg-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.08 }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                    />
                  </div>

                  {poll.isActive && currentAccount && (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onVote(poll.id, index)}
                      disabled={isVoting}
                      type="button"
                      className="mt-4 w-full rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 dark:border-white/20 dark:text-slate-200 disabled:opacity-50"
                    >
                      {isVoting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="h-4 w-4 rounded-full border-2 border-slate-400 border-t-transparent"
                          />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Cast vote
                        </span>
                      )}
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
            >
              {error}
            </motion.div>
          )}

          {!currentAccount && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
            >
              <BarChart3 className="h-5 w-5" /> Connect your wallet to participate in this ballot.
            </motion.div>
          )}

          {!poll.isActive && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <XCircle className="h-5 w-5" /> Voting has been closed for this poll.
            </motion.div>
          )}
        </section>

        <aside className="space-y-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-6 text-sm text-slate-600 shadow-inner shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Snapshot</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="font-semibold text-slate-900 dark:text-white">{poll.isActive ? 'Active' : 'Closed'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total votes</span>
                <span className="font-semibold text-slate-900 dark:text-white">{totalVotes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Creator</span>
                <span className="truncate text-right font-semibold text-slate-900 dark:text-white">{poll.creator}</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Every interaction is notarized on-chain. Download the audit file from the Polls list for offline archiving.
          </div>
        </aside>
      </div>
    </motion.div>
  );
}