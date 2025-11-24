import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Lock, Users2, LineChart, Layers, Building2 } from 'lucide-react';

const stats = [
  { value: '11K+', label: 'Verifiable ballots processed' },
  { value: '<2s', label: 'Median confirmation time' },
  { value: '40+', label: 'Institutional deployments' }
];

const featureHighlights = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Governance-grade security',
    description: 'Audited Solidity contracts, formal verification, and rollup ready attestations.'
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Privacy preserved',
    description: 'Zero-knowledge proofs with per-ballot encryption so intent stays off-chain.'
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: 'Realtime observability',
    description: 'Stream voting telemetry and compliance exports directly into your data lake.'
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Composable services',
    description: 'API-first architecture that snaps into fintech, civic, or DAO workflows.'
  }
];

const workflow = [
  {
    title: 'Design your ballot',
    detail: 'Model weighted or anonymous voting policies, warm start from presets, and inject governance guardrails.'
  },
  {
    title: 'Distribute confidently',
    detail: 'Leverage allowlists, SSO, or wallet gating with one-click attestation packages.'
  },
  {
    title: 'Audit in real time',
    detail: 'Observer dashboards expose latency, fraud signals, and export-ready evidence trails.'
  }
];

const trustSignals = ['EVM Compatible', 'SOC2 Program', 'Zero Knowledge Native', 'Global Support'];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr),420px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-10 shadow-2xl shadow-indigo-500/10 dark:border-white/10 dark:bg-slate-950/70">
          <div className="absolute inset-0 opacity-30">
            <div className="grid-overlay" />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              Enterprise Ready Stack
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Governance flows that scale without compromising privacy.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                VoteLedger orchestrates tamper-proof voting, compliance telemetry, and live audits across every channel—wallet, mobile, or enterprise dashboard.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/polls"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 dark:bg-white dark:text-slate-900"
              >
                Explore live polls
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/40"
              >
                Launch a poll
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              {trustSignals.map((signal) => (
                <span key={signal} className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-white/10">
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-gradient-to-b from-white/80 to-slate-50/70 p-8 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:from-slate-900/80 dark:to-slate-900/40">
          <div className="mb-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
              Operational telemetry
            </p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Live audit feed</h3>
            <p className="text-sm text-slate-500 dark:text-slate-300">All signals are cryptographically signed and piped into your SIEM or Slack.</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-100/80 bg-white/80 p-4 text-sm text-slate-600 shadow-sm dark:border-white/5 dark:bg-slate-900/60 dark:text-slate-200"
              >
                <p className="font-semibold text-slate-900 dark:text-white">
                  {item === 1 && 'New ballot issued | Board Remuneration 2025'}
                  {item === 2 && '12 validators synced | zk proofs settled'}
                  {item === 3 && 'Anomalous traffic resolved | 0 risk remaining'}
                  {item === 4 && 'Export delivered to regulator sandbox'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item === 3 ? '12:41 UTC' : item === 4 ? '12:07 UTC' : '12:58 UTC'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {featureHighlights.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-900/5 p-3 text-slate-900 dark:bg-white/10 dark:text-white">
              {feature.icon}
            </div>
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/70 bg-white/90 p-10 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
              Operating Model
            </p>
            <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">
              A workflow built for legal, compliance, and product in the same room.
            </h3>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/40"
          >
            View methodology
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {workflow.map((step, index) => (
            <div key={step.title} className="space-y-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                0{index + 1}
              </span>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{step.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg shadow-slate-900/5 dark:border-white/5 dark:bg-slate-950/60">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
            <Users2 className="h-4 w-4" /> Use cases
          </div>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">
            Investor relations, civic engagement, internal governance, and DAO stewardship.
          </p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Configure quorum, weighted rights, and audit requirements per poll. Export everything into your ERP, CRM, and regtech stack with one webhook.
          </p>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg shadow-slate-900/5 dark:border-white/5 dark:bg-slate-950/60">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
            <Building2 className="h-4 w-4" /> Deployment Models
          </div>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>- Managed SaaS with dedicated tenant isolation and SOC2-ready controls.</p>
            <p>- Hybrid deployment anchoring state on-chain while running proofs in your VPC.</p>
            <p>- On-prem for regulated entities with HSM-backed signing and air-gapped recovery runbooks.</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/70 bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/30 dark:border-white/5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">Ready to deploy</p>
            <h3 className="text-3xl font-semibold">Spin up a zero-knowledge powered voting experience today.</h3>
            <p className="mt-3 text-sm text-slate-300">
              Our solutions team helps white-label the frontend, wire custom auth, and pass security review inside two weeks.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/create"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Book a build session
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
