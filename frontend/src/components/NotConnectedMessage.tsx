
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Vote, CheckCircle } from 'lucide-react';

export default function NotConnectedMessage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-white/70 bg-white/90 p-10 text-center shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-950/70"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-full mb-6"
      >
        <Lock className="w-16 h-16 text-white" />
      </motion.div>
      
      <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
        Wallet Connection Required
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
        Connect your MetaMask wallet to unlock the full power of VoteLedger
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-700 p-4 rounded-xl"
        >
          <Vote className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Create & Vote</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Launch polls and cast your votes</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-700 p-4 rounded-xl"
        >
          <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Secure Identity</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Blockchain-verified authentication</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-700 p-4 rounded-xl"
        >
          <Lock className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Anonymous Voting</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your votes remain private</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-700 p-4 rounded-xl"
        >
          <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Transparent Results</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Real-time, tamper-proof data</p>
        </motion.div>
      </div>
    </motion.div>
  );
}