import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  MessageSquare,
  ShieldCheck,
  Calendar,
  BookOpen,
  BarChart3,
  Sliders,
  CheckCircle,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Features — Anonymous Feedback, Meeting Notes & Team Handbooks',
  description:
    'Explore FeedbackFlow capabilities: anonymous feedback streams, structured meeting notes, actionable checklists, and privacy-first team analytics.',
  canonical: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Feedback Streams',
      description:
        'Create topics for sprint retrospectives, product feedback, or leadership Q&As. Teammates can respond with their names or activate anonymous mode.',
      points: [
        'Dedicated shareable public links for outside contributors',
        'Categorized by engineering, culture, product, and leadership',
        'Direct archiving to keep discussion boards uncluttered',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Architectural Anonymity',
      description:
        'Protect sensitive perspectives with confidence. Anonymity is enforced at the database level by nullifying author IDs.',
      points: [
        'Zero correlation between user accounts and anonymous records',
        'Scrubbed metadata to prevent IP or user-agent fingerprinting',
        'Clear privacy disclosures on submission forms',
      ],
    },
    {
      icon: Calendar,
      title: 'Purposeful Meeting Notes',
      description:
        'Keep synchronous time sacred. Publish meeting objectives in advance, record collaborative markdown notes, and assign action items.',
      points: [
        'Integrated checklist for actionable takeaways',
        'Markdown notes editor for rich formatting',
        'Attendee participant tracking for accountability',
      ],
    },
    {
      icon: BookOpen,
      title: 'Living Team Handbooks & Templates',
      description:
        'Equip your team with proven guidelines for psychological safety, 1-on-1 meeting templates, and retrospective agendas.',
      points: [
        'Pre-configured templates ready to duplicate',
        'Category-based search across guidelines and policies',
        'Curated resources on feedback etiquette',
      ],
    },
    {
      icon: BarChart3,
      title: 'Meaningful Engagement Insights',
      description:
        'Analytics designed to answer questions rather than fill empty dashboard slots. Understand participation volume and safety trends.',
      points: [
        'Ratio of anonymous vs. identified contributions',
        'Topic distribution across organizational categories',
        'Asynchronous submission density by day of week',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Product Overview
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Tools built for clarity, not busywork
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Every capability in FeedbackFlow has a clear job: foster honest dialogue, eliminate unnecessary meetings, and build sustainable team operating principles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-lg border border-slate-200 bg-white p-6 space-y-4 shadow-subtle flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-9 w-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-900">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.description}
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-8 sm:p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Ready to streamline workplace communication?
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Start for free. No credit card required. Experience quiet productivity.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/app">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Open Workspace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
