import React from 'react';
import { Mail, MessageSquare, Clock, Globe2, PhoneCall, ArrowRight } from 'lucide-react';

const channels = [
  {
    title: 'Product & Integrations',
    detail: 'governance@voteledger.io',
    description: 'Roadmap, solutioning workshops, and co-builds.',
    icon: <Mail className="h-5 w-5" />
  },
  {
    title: 'Support Desk',
    detail: 'support@voteledger.io',
    description: 'Priority SLAs for enterprise deployments.',
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    title: 'Phone (GMT +5:30)',
    detail: '+91 7000 000 000',
    description: 'Escalations and compliance handoffs.',
    icon: <PhoneCall className="h-5 w-5" />
  }
];

const ContactPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/70 bg-white/90 p-10 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Contact</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">White-glove onboarding for every deployment.</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Whether you are shipping a civic referendum, a shareholder vote, or an internal governance ritual, our team can help tailor the protocol, reporting, and user experience. Expect a reply inside one business day.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {channels.map((channel) => (
          <div
            key={channel.title}
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60"
          >
            <div className="mb-4 inline-flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="rounded-2xl bg-slate-900/5 p-3 dark:bg-white/10">{channel.icon}</span>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-300">
                {channel.title}
              </p>
            </div>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">{channel.detail}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{channel.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-white/70 bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/20 dark:border-white/5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">Engagement package</p>
          <h3 className="mt-3 text-2xl font-semibold">Implementation timeline</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Week 1: Discovery, architecture workshop, security review.</li>
            <li>Week 2: Branded frontend + policy configuration + dry run.</li>
            <li>Week 3: Production go-live, audit exports wired, success playbook.</li>
          </ul>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold"
          >
            Request statement of work
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg shadow-slate-900/5 dark:border-white/5 dark:bg-slate-950/60">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
            <Clock className="h-4 w-4" /> Availability
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Global coverage</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            08:00 - 21:00 IST | Monday to Saturday
            <br />Dedicated PagerDuty rotation for production contracts.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:border-white/10 dark:text-slate-200">
            <Globe2 className="h-4 w-4" /> Remote-first, on-site on request
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
