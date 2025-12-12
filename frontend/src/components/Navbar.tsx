import React from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, Home, Info, Users, Mail, List, PlusCircle, LogOut } from 'lucide-react';

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
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="pointer-events-auto w-full max-w-5xl rounded-full border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5 dark:bg-slate-950/80 dark:border-white/10 dark:shadow-black/20"
      >
        <div className="px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-2 text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
                <Vote className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  VoteLedger
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <DesktopNavLink key={item.to} {...item} />
              ))}
              {account && <DesktopNavLink to="/create" label="Create" icon={<PlusCircle className="w-4 h-4" />} />}
            </div>

            {/* Wallet Connection */}
            <div className="flex items-center gap-3 shrink-0">
              {account ? (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                      alt="MetaMask"
                      className="h-4 w-4"
                    />
                    <span>{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onDisconnect}
                    className="rounded-full bg-red-50 p-2 text-red-500 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    title="Disconnect"
                  >
                    <LogOut className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onConnect}
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 dark:bg-white dark:text-slate-900"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    alt="MetaMask"
                    className="h-4 w-4"
                  />
                  <span className="hidden sm:inline">Connect</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile Nav Row */}
          <div className="md:hidden mt-3 flex items-center justify-center gap-6 border-t border-slate-200/50 pt-3 dark:border-white/5">
             {navItems.map((item) => (
                <MobileNavLink key={item.to} to={item.to} icon={item.icon} />
             ))}
             {account && <MobileNavLink to="/create" icon={<PlusCircle className="w-4 h-4" />} />}
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

interface DesktopNavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

const DesktopNavLink: React.FC<DesktopNavLinkProps> = ({ to, label, icon, end }) => (
  <RouterNavLink
    to={to}
    end={end}
    className={({ isActive }: { isActive: boolean }) =>
      `relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'text-slate-900 dark:text-white'
          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
      }`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute inset-0 rounded-full bg-slate-100 dark:bg-white/10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {icon}
          {label}
        </span>
      </>
    )}
  </RouterNavLink>
);

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  end?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, end }) => (
  <RouterNavLink
    to={to}
    end={end}
    className={({ isActive }: { isActive: boolean }) =>
      `rounded-full p-2 transition-colors ${
        isActive
          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
          : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10'
      }`
    }
  >
    {icon}
  </RouterNavLink>
);

export default Navbar;
