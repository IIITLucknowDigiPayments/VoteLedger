import React from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, Home, Info, Users, Mail, List, PlusCircle, LogOut, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  account: string | null;
  onDisconnect: () => void;
  onConnect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ account, onDisconnect, onConnect }) => {
  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="w-4 h-4" />, end: true },
    { to: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { to: '/team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { to: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
    { to: '/polls', label: 'Polls', icon: <List className="w-4 h-4" /> }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-white/50 bg-white/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-8">
              <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                <Link to="/" className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 text-white shadow-lg shadow-indigo-500/30">
                    <Vote className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      VoteLedger
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      Governance Cloud
                    </p>
                  </div>
                </Link>
              </motion.div>
              <div className="hidden lg:flex items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-600 dark:border-white/10 dark:text-slate-200">
                  Enterprise Ready
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Audited contracts | SOC2 aligned operations
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <DesktopNavLink key={item.to} {...item} />
                ))}
                {account && <DesktopNavLink to="/create" label="Create" icon={<PlusCircle className="w-4 h-4" />} />}
              </div>

              <div className="flex items-center gap-3">
                {account ? (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-inner dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                        alt="MetaMask"
                        className="h-5 w-5"
                      />
                      <span className="hidden sm:inline">{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onDisconnect}
                      className="rounded-full border border-red-100/60 p-2 text-red-500 hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                      title="Disconnect"
                    >
                      <LogOut className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onConnect}
                    className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 dark:bg-white dark:text-slate-900"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                      alt="MetaMask"
                      className="h-5 w-5"
                    />
                    Connect Wallet
                  </motion.button>
                )}

                <Link
                  to="/create"
                  className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/40"
                >
                  Launch Poll
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex flex-wrap gap-2">
            {navItems.map((item) => (
              <MobileNavLink key={item.to} to={item.to} label={item.label} end={item.end} />
            ))}
            {account && <MobileNavLink to="/create" label="Create" />}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

interface DesktopNavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

const DesktopNavLink: React.FC<DesktopNavLinkProps> = ({ to, label, icon, end }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          isActive
            ? 'bg-slate-900 text-white shadow-lg shadow-indigo-500/20 dark:bg-white dark:text-slate-900'
            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </RouterNavLink>
  </motion.div>
);

interface MobileNavLinkProps {
  to: string;
  label: string;
  end?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, end }) => (
  <RouterNavLink
    to={to}
    end={end}
    className={({ isActive }: { isActive: boolean }) =>
      `rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
        isActive
          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
          : 'bg-white/70 text-slate-600 dark:bg-slate-900/40 dark:text-slate-200'
      }`
    }
  >
    {label}
  </RouterNavLink>
);

export default Navbar;
