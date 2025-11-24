import * as React from "react";
import { motion } from 'framer-motion';
import { PlusCircle, MinusCircle, Sparkles } from 'lucide-react';
const { useState } = React;

interface CreatePollProps {
  onCreate: (question: string, options: string[]) => Promise<void>;
  isCreating: boolean;
}

export default function CreatePoll({ onCreate, isCreating }: CreatePollProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState<string | null>(null);

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length >= 5) {
      setError("Maximum 5 options allowed");
      return;
    }
    setOptions([...options, ""]);
    setError(null);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      setError("Minimum 2 options required");
      return;
    }
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!question.trim()) {
      setError("Question is required");
      return;
    }
    
    const validOptions = options.filter(opt => opt.trim() !== "");
    if (validOptions.length < 2) {
      setError("At least 2 valid options are required");
      return;
    }
    
    try {
      await onCreate(question, validOptions);
      // Reset form on success
      setQuestion("");
      setOptions(["", ""]);
    } catch (err) {
      console.error("Failed to create poll:", err);
      setError(err instanceof Error ? err.message : "Failed to create poll");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-white/70 bg-white/95 p-8 shadow-2xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/70"
    >
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Poll</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Poll Question
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to ask?"
            className="w-full rounded-2xl border border-slate-200 bg-white/90 p-4 text-slate-900 focus:border-slate-900 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-white"
            disabled={isCreating}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Options (2-5)
          </label>
          
          <motion.div layout className="space-y-3">
            {options.map((option, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full rounded-2xl border border-slate-200 bg-white/90 pl-10 pr-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-white"
                    disabled={isCreating}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => removeOption(index)}
                  className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-red-500/10"
                  disabled={options.length <= 2 || isCreating}
                >
                  <MinusCircle className="w-6 h-6" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={addOption}
            className="mt-4 flex items-center gap-2 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            disabled={options.length >= 5 || isCreating}
          >
            <PlusCircle className="w-5 h-5" />
            Add Option
          </motion.button>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl"
          >
            {error}
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isCreating}
          className="w-full rounded-full bg-slate-900 py-4 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900"
        >
          {isCreating ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Creating Poll...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Create Poll
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}