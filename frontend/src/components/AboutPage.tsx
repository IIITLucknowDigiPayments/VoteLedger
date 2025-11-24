import React from 'react';
import { ShieldCheck, Lock, Layers } from 'lucide-react';

const principles = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Security as a posture',
    detail: 'Audited contracts, reproducible builds, scoped keys, and layered detection spanning infrastructure to protocol.'
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Privacy by construction',
    detail: 'Zero-knowledge circuits, blinded identifiers, and jurisdiction-aware retention controls baked into the core workflow.'
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Interoperable layers',
    detail: 'APIs, SDKs, and pre-built connectors so compliance, legal, and product teams operate on the same primitives.'
  }
];

const roadmap = [
  {
    title: 'Infrastructure',
    description: 'Optimized for Ethereum and Layer 2 rollups with modular proof pipelines and sequencer redundancy.'
  },
  {
    title: 'Experience',
    description: 'Forward-deployed design system, responsive dashboards, and branded voter journeys that feel premium.'
  },
  {
    title: 'Partnerships',
    description: 'Aligning with civic teams, regulated fintechs, and DAOs to codify trustworthy governance operations.'
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/70 bg-white/90 p-10 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Our mission</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
          Build a governance fabric where every vote is private, provable, and production ready.
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          VoteLedger was born inside IIIT Lucknow's Digital Payments Lab. We combine research-heavy cryptography with enterprise delivery to help organizations move beyond survey-grade tooling. Every module-from onboarding to audit exports-is production hardened.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {principles.map((principle) => (
          <div
            key={principle.title}
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-900/5 p-3 text-slate-900 dark:bg-white/10 dark:text-white">
              {principle.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{principle.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{principle.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Operating cadence</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Research → Build → Run → Certify</h3>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Teams across cryptography, product design, and site reliability work in the same pod. We ship upgrades in weekly trains, with long-term cryptography initiatives running quarterly. Every release ships alongside playbooks for compliance, customer success, and integrations.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-900/5 p-4 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-200">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">Global uptime ring</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Multi-region rollup infrastructure with continuous failover drills.</p>
            </div>
            <div className="rounded-2xl bg-slate-900/5 p-4 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-200">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">Audit provability</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">End-to-end evidence bundles for regulators, partners, and customers.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/70 bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/20 dark:border-white/5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">Roadmap focuses</p>
          <ul className="mt-4 space-y-5 text-sm text-slate-300">
            {roadmap.map((item) => (
              <li key={item.title} className="space-y-1">
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Stack</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Trusted technical foundation</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              - Solidity, TypeScript, and zk-SNARK pipelines
              <br />- Observability via OpenTelemetry and ClickHouse
              <br />- Deployment automation using Terraform and GitHub Actions
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100/80 bg-white/70 p-6 text-sm text-slate-600 shadow-sm dark:border-white/5 dark:bg-slate-900/60 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">What success looks like</p>
            <p className="mt-2">
              - Votes close with verifiable accuracy &lt; 60 seconds after the window ends.
              <br />- Compliance exports delivered automatically to every stakeholder.
              <br />- Participants trust the channel because UX feels premium and private.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
