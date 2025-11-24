import React from 'react';
import { Users2, Award, Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  cohort: string;
}

const members: TeamMember[] = [
  { name: 'Divyansh Gautam', role: 'Protocol Lead', focus: 'Smart contracts, zk circuits', cohort: 'LCB2022057' },
  { name: 'Pankaj Kumar', role: 'Platform Engineer', focus: 'DevOps, infrastructure', cohort: 'LCB2022039' },
  { name: 'Atul Chaudhary', role: 'Backend Engineer', focus: 'Off-chain services', cohort: 'LCB2022036' },
  { name: 'Sarvesh Kumar', role: 'Full-Stack Engineer', focus: 'Console and experience', cohort: 'LCB2022048' },
  { name: 'Vittal Arabhanvi', role: 'Security Engineer', focus: 'Audits and threat modeling', cohort: 'LCB2022044' },
  { name: 'Aryan Verma', role: 'Product Strategist', focus: 'Governance design', cohort: 'MDB24034' },
  { name: 'Dhanu Kumar Mandal', role: 'Research Engineer', focus: 'Cryptography R&D', cohort: 'MDB24026' },
  { name: 'Aman Yadav', role: 'UX Engineer', focus: 'Design systems', cohort: 'MDB24019' }
];

const TeamPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/70 bg-white/90 p-10 text-slate-900 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60 dark:text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Builders</p>
            <h2 className="mt-2 text-3xl font-semibold">The VoteLedger core team</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              A cross-functional pod from IIIT Lucknow experimenting with cryptography, governance, and delightful enterprise UX.
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-700 dark:border-white/10 dark:text-slate-200">
              <Users2 className="h-4 w-4" /> 8 builders
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-700 dark:border-white/10 dark:text-slate-200">
              <Award className="h-4 w-4" /> Research Lab Backed
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {members.map((member) => (
          <article
            key={member.name}
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/60"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">{member.role}</p>
              </div>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-200">
                {member.cohort}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Focus: {member.focus}</p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200"
            >
              <Linkedin className="h-4 w-4" /> Connect
            </button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default TeamPage;
