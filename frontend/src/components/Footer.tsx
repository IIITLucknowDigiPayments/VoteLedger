import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, Github, Linkedin, Mail, Shield, Lock, Zap, Sparkles } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Polls', to: '/polls' },
  { label: 'Create Poll', to: '/create' },
  { label: 'Contact', to: '/contact' }
];

const featureHighlights = [
  { icon: <Shield className="w-4 h-4" />, label: 'Audited smart contracts' },
  { icon: <Lock className="w-4 h-4" />, label: 'Privacy-first cryptography' },
  { icon: <Zap className="w-4 h-4" />, label: 'Realtime settlement layer' }
];

const contactChannels = [
  { icon: <Mail className="w-4 h-4" />, label: 'governance@voteledger.io', href: 'mailto:governance@voteledger.io' },
  { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: '#linkedin' },
  { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com/IIITLucknowDigiPayments/VoteLedger' }
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/40 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 text-white shadow-lg shadow-indigo-500/30">
                <Vote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">VoteLedger</p>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Trust Layer</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Institutional-grade governance rails bringing verifiable, privacy-preserving voting workflows to every product team.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> SOC2-aligned controls
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-200">
                99.95% uptime SLA
              </span>
            </div>
            <div className="flex gap-3">
              <SocialLink href="https://github.com/IIITLucknowDigiPayments/VoteLedger" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#linkedin" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="mailto:governance@voteledger.io" icon={<Mail className="w-5 h-5" />} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Navigation</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Capabilities</h4>
              <ul className="space-y-3">
                {featureHighlights.map((feature) => (
                  <FeatureItem key={feature.label} icon={feature.icon} label={feature.label} />
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Contact</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Built by IIIT Lucknow Digital Payments Lab. We partner with civic teams, universities, and fintech platforms to roll out confident voting flows.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {contactChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    <span className="text-indigo-500">{channel.icon}</span>
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/40 pt-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} VoteLedger. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#privacy" className="hover:text-slate-900 dark:hover:text-white">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-slate-900 dark:hover:text-white">
                Terms of Service
              </a>
              <a href="#status" className="hover:text-slate-900 dark:hover:text-white">
                Status Page
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">Powered by Ethereum, Solidity, zk-SNARKs, React, and Web3 tooling.</p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
    >
      {icon}
    </motion.a>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  label: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, label }) => (
  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
    <span className="text-indigo-500">{icon}</span>
    {label}
  </li>
);

export default Footer;
