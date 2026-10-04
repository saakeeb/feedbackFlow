import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  MessageSquare,
  ShieldCheck,
  Calendar,
  BookOpen,
  BarChart3,
  CheckCircle,
  ArrowRight,
  FileText,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Features — Editorial Communication & Paragraph-Level Feedback',
  description:
    'Explore FeedbackFlow capabilities: paragraph-level anonymous feedback, structured sync notes, living team resources, and privacy-first analytics.',
  canonical: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      index: '01',
      icon: MessageSquare,
      title: 'Paragraph-Level Feedback',
      description:
        'Anchor observations directly to the paragraph, proposal, or decision being reviewed. Stop losing context in generic footer comment boxes.',
      points: [
        'Interactive paragraph selection & visual highlighting',
        'Direct constructive feedback thread tied to original excerpt',
        'Fearless submission with single-click anonymity toggle',
      ],
    },
    {
      index: '02',
      icon: ShieldCheck,
      title: 'Architectural Anonymity',
      description:
        'True psychological safety enforced by database constraints. Author IDs are scrubbed to null at the PostgreSQL layer.',
      points: [
        'Zero attribution in database records',
        'Client metadata & IP fingerprint stripping',
        'Supabase Row-Level Security on all endpoints',
      ],
    },
    {
      index: '03',
      icon: Calendar,
      title: 'Purposeful Meeting Notes',
      description:
        'Keep synchronous time sacred. Publish meeting objectives and pre-reads in advance, record collaborative notes, and track action items.',
      points: [
        'Actionable checklist with assigned ownership',
        'Pre-read distribution before meetings begin',
        'Asynchronous feedback collection following discussions',
      ],
    },
    {
      index: '04',
      icon: BookOpen,
      title: 'Living Resources & Handbooks',
      description:
        'Equip your team with battle-tested operating guidelines, feedback culture handbooks, and 1-on-1 discussion templates.',
      points: [
        'Editorial reading experience with reading times',
        'Direct search across operating templates',
        'Actionable guides on receiving criticism without defensiveness',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 sm:px-8 space-y-20">
      {/* Editorial Header */}
      <div className="space-y-6 border-b border-white/10 pb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
          Product Capabilities
        </span>
        <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase leading-[0.98]">
          Designed for
          <br />
          Thought.
        </h1>
        <p className="text-lg sm:text-xl text-[#9a9a95] leading-relaxed max-w-3xl">
          Every interaction in FeedbackFlow is built to remove hesitation, anchor feedback to what matters, and produce calm, constructive outcomes.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-xl border border-white/15 bg-[#141414] p-8 space-y-6 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-[#d8ff3e]">
                    {f.index}
                  </span>
                  <div className="h-8 w-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-[#f5f3ee]">
                  {f.title}
                </h3>
                <p className="text-sm text-[#9a9a95] leading-relaxed">
                  {f.description}
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-white/10">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-[#f5f3ee]/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d8ff3e] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="rounded-xl border border-white/15 bg-[#141414] p-8 sm:p-14 text-center space-y-6 shadow-2xl">
        <h2 className="text-h2 font-display text-[#f5f3ee] tracking-tight">
          Say what needs to be said.
        </h2>
        <p className="text-[#9a9a95] text-sm sm:text-base max-w-md mx-auto">
          Experience paragraph-level anonymous feedback without corporate noise.
        </p>
        <div className="pt-2 flex justify-center">
          <Link href="/app">
            <Button size="lg" className="gap-2">
              Start giving feedback
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
