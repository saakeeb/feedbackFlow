import Link from 'next/link';
import Button from '@/components/ui/Button';
import InteractiveParagraphDemo from '@/components/marketing/InteractiveParagraphDemo';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Database,
  EyeOff,
  CheckCircle2,
  FileText,
  CornerDownRight,
  BookOpen,
  Calendar,
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getSoftwareApplicationSchema } from '@/lib/seo/structured-data';

export const metadata = constructMetadata({
  title: 'FeedbackFlow — Say What Needs to Be Said',
  description:
    'Give constructive feedback on any paragraph, idea, decision, document, or conversation — without exposing your identity.',
  canonical: '/',
});

export default function HomePage() {
  const jsonLd = getSoftwareApplicationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-24 sm:space-y-36 pb-24 overflow-hidden">
        {/* ========================================================
            01 — HERO SECTION
            ======================================================== */}
        <section className="relative mx-auto max-w-7xl px-4 sm:px-8 pt-16 sm:pt-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 sm:pb-20 border-b border-white/10">
            {/* Hero Typography */}
            <div className="space-y-8 max-w-4xl">
              <div className="inline-flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#d8ff3e]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#9a9a95]">
                  01 / 04 · Editorial Communication Software
                </span>
              </div>

              <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase">
                Say what
                <br />
                needs to
                <br />
                be said.
              </h1>

              <p className="text-lg sm:text-2xl text-[#9a9a95] font-normal leading-relaxed max-w-2xl">
                Give constructive feedback on any paragraph, idea, decision, document, or conversation —{' '}
                <span className="text-[#f5f3ee] font-medium">without exposing your identity</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link href="/app">
                  <Button size="lg" className="w-full sm:w-auto">
                    Give anonymous feedback
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    See how it works
                  </Button>
                </a>
              </div>
            </div>

            {/* Quick Hero Indicator / Philosophy */}
            <div className="lg:max-w-xs space-y-4 pb-2 border-l border-white/10 pl-6 lg:pl-8 text-xs text-[#9a9a95] leading-relaxed">
              <span className="font-mono uppercase tracking-widest text-[#f5f3ee] text-[11px] block">
                The Fearless Philosophy
              </span>
              <p>
                People often know what should be improved, but hesitate because their identity is attached. FeedbackFlow removes that fear.
              </p>
              <div className="pt-2 font-mono text-[#d8ff3e] text-[11px]">
                Anonymity · Clarity · Action
              </div>
            </div>
          </div>

          {/* Hero Visual: Editorial document with highlighted paragraph & attached anonymous feedback */}
          <div className="mt-12 sm:mt-16 rounded-xl border border-white/15 bg-[#141414] p-6 sm:p-12 shadow-2xl relative">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#9a9a95] uppercase tracking-widest">
                  Internal Proposal · Memo 04
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-[#d8ff3e]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Decoupled Attribution
                </span>
              </div>

              {/* Selected Paragraph Highlight */}
              <div className="space-y-4">
                <p className="text-base sm:text-xl text-[#9a9a95] leading-relaxed">
                  Our current product onboarding requires new team members to complete seven separate administrative setups before opening code access.
                </p>

                {/* The highlighted paragraph */}
                <div className="relative rounded-lg border border-[#d8ff3e] bg-[#1c1d15] p-5 sm:p-6 shadow-lg">
                  <p className="text-base sm:text-xl text-[#f5f3ee] font-medium leading-relaxed">
                    “The current onboarding process requires new employees to complete seven separate steps before accessing the core workspace.”
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#d8ff3e] font-mono">
                    <span>§ 02 Selected for review</span>
                    <span className="uppercase">Comment attached</span>
                  </div>
                </div>

                {/* The attached feedback card */}
                <div className="sm:ml-8 rounded-lg border border-white/15 bg-[#1b1b1b] p-5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-[#f5f3ee]">
                      <span className="h-2 w-2 rounded-full bg-[#d8ff3e]" />
                      Anonymous comment
                    </div>
                    <span className="text-[11px] font-mono text-[#9a9a95]">
                      Anonymous · Constructive
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f5f3ee]/90 leading-relaxed font-normal">
                    “This is where most people probably get confused. Could we consolidate the workspace setup into three automated scripts to reduce first-day friction?”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            02 — THE PROBLEM (WARM PAPER EDITORIAL SECTION)
            ======================================================== */}
        <section className="paper-surface py-20 sm:py-32 border-y border-black/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-black/60 block">
                02 / The Human Problem
              </span>
              <span className="h-0.5 w-12 bg-black block" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-h1 font-display text-[#111111] leading-[1.05] tracking-tight">
                  The feedback people need to hear is often the feedback people are afraid to give.
                </h2>
              </div>

              <div className="lg:col-span-4 space-y-6 text-[#5a5852] text-base sm:text-lg leading-relaxed pt-2">
                <p>
                  When every comment carries a name, people naturally become more careful. Sometimes that protects politeness. <strong className="text-[#111111]">Sometimes it protects the problem.</strong>
                </p>
                <p>
                  When hierarchy enters the conversation, candid observation is the first thing lost. FeedbackFlow restores psychological safety by detaching the observation from the person who noticed it.
                </p>
                <div className="pt-2">
                  <Link href="/anonymous-feedback" className="text-xs uppercase tracking-widest font-semibold text-[#111111] hover:underline flex items-center gap-2">
                    Read our anonymity architecture →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            03 — THE CORE INTERACTION: PARAGRAPH-LEVEL FEEDBACK
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="space-y-6 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
              03 / Core Interaction
            </span>
            <h2 className="text-h1 font-display text-[#f5f3ee] tracking-tight">
              Comment on the work.
              <br />
              <span className="text-[#9a9a95]">Not the person.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#9a9a95] leading-relaxed">
              Generic comment boxes at the bottom of pages disconnect feedback from context. FeedbackFlow anchors observations directly to the paragraph being discussed.
            </p>

            {/* Rhythm chain */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs text-[#d8ff3e] pt-2">
              <span className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[#f5f3ee]">Document</span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[#f5f3ee]">Select</span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[#f5f3ee]">Comment</span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded border border-[#d8ff3e]/40 bg-[#d8ff3e]/10 text-[#d8ff3e]">Anonymous</span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[#f5f3ee]">Improve</span>
            </div>
          </div>

          {/* Live interactive component */}
          <InteractiveParagraphDemo />
        </section>

        {/* ========================================================
            04 — PRIVACY & TRUST ARCHITECTURE
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="border-t border-white/10 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
                04 / Privacy & Trust UX
              </span>
              <h2 className="text-h2 font-display text-[#f5f3ee] tracking-tight">
                Anonymity should never be hidden behind fine print.
              </h2>
              <p className="text-sm sm:text-base text-[#9a9a95] leading-relaxed">
                Before submitting any feedback, users see an explicit privacy confirmation. We describe the actual technical behavior rather than making vague marketing claims.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-white/15 bg-[#141414] space-y-3">
                <div className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
                  <Database className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold font-display text-[#f5f3ee]">
                  Zero Author Attribution
                </h3>
                <p className="text-xs text-[#9a9a95] leading-relaxed">
                  When anonymous mode is active, the database record sets <code className="text-[#d8ff3e] font-mono">user_id = null</code>. No relational link connects your identity to the submitted row.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/15 bg-[#141414] space-y-3">
                <div className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
                  <EyeOff className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold font-display text-[#f5f3ee]">
                  Metadata Scrubbing
                </h3>
                <p className="text-xs text-[#9a9a95] leading-relaxed">
                  User agent fingerprints, client headers, and IP logs are decoupled from anonymous payloads to prevent network correlation attacks.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/15 bg-[#141414] space-y-3">
                <div className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
                  <Lock className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold font-display text-[#f5f3ee]">
                  Row-Level Security (RLS)
                </h3>
                <p className="text-xs text-[#9a9a95] leading-relaxed">
                  Enforced natively in PostgreSQL. Even workspace administrators or team leads cannot bypass database policies to reveal identities.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/15 bg-[#141414] space-y-3">
                <div className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold font-display text-[#f5f3ee]">
                  Fearless Composer UX
                </h3>
                <p className="text-xs text-[#9a9a95] leading-relaxed">
                  Every submit button states <strong className="text-[#f5f3ee]">“Send anonymously”</strong> so contributors never wonder if their manager can see their name.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            05 — HOW IT WORKS (FOUR-STEP EDITORIAL GRID)
            ======================================================== */}
        <section id="how-it-works" className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="space-y-4 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
                05 / Process
              </span>
              <h2 className="text-h1 font-display text-[#f5f3ee] tracking-tight">
                How it works
              </h2>
            </div>
            <p className="text-sm text-[#9a9a95] max-w-md">
              Four deliberate steps designed to eliminate hesitation and produce high-quality constructive discourse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#d8ff3e] block">
                  01
                </span>
                <h3 className="text-xl font-bold font-display text-[#f5f3ee]">
                  Read
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9a95] leading-relaxed">
                  Read the document, idea, proposal, retrospective, or draft directly within the workspace.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-[#6f6f6a]">
                Document review
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#d8ff3e] block">
                  02
                </span>
                <h3 className="text-xl font-bold font-display text-[#f5f3ee]">
                  Select
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9a95] leading-relaxed">
                  Highlight the exact paragraph, decision, or statement that needs constructive clarification.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-[#6f6f6a]">
                Paragraph anchoring
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#d8ff3e] block">
                  03
                </span>
                <h3 className="text-xl font-bold font-display text-[#f5f3ee]">
                  Say what you think
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9a95] leading-relaxed">
                  Explain what isn’t working, suggest an alternative, and focus on improving the work.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-[#6f6f6a]">
                Constructive guidance
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#d8ff3e] block">
                  04
                </span>
                <h3 className="text-xl font-bold font-display text-[#f5f3ee]">
                  Stay anonymous
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9a95] leading-relaxed">
                  Send your thought without attaching your name. Start a valuable conversation without personal risk.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-[#6f6f6a]">
                Decoupled identity
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            06 — PRODUCT DEMONSTRATION (LARGE DARK CANVAS)
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
              06 / Product Demonstration
            </span>
            <h2 className="text-h2 font-display text-[#f5f3ee] tracking-tight">
              Real feedback on real work
            </h2>
          </div>

          <div className="rounded-xl border border-white/15 bg-[#141414] p-6 sm:p-12 space-y-8 shadow-2xl">
            <div className="space-y-2 border-b border-white/10 pb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9a9a95]">
                Document / Strategy
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#f5f3ee] tracking-tight">
                Q3 Product Strategy & Platform Expansion
              </h3>
            </div>

            <div className="space-y-6 max-w-4xl text-sm sm:text-base text-[#9a9a95] leading-relaxed">
              <p>
                Our primary focus for Q3 will be expanding our enterprise connectors and refactoring the synchronous pipeline. This will allow larger enterprise organizations to ingest feedback streams across their existing communication tools.
              </p>

              {/* Anchored paragraph in document */}
              <div className="rounded-lg border border-[#d8ff3e] bg-[#1a1a14] p-5 sm:p-6 space-y-3">
                <span className="text-[11px] font-mono uppercase text-[#d8ff3e] tracking-widest">
                  § Selected Paragraph
                </span>
                <p className="text-base sm:text-lg text-[#f5f3ee] font-medium leading-relaxed">
                  “The second phase may introduce unnecessary complexity for smaller teams by forcing strict organizational hierarchies before team creation.”
                </p>
              </div>

              {/* Conversation thread attached */}
              <div className="pl-4 sm:pl-8 border-l-2 border-white/20 space-y-4 pt-2">
                <div className="rounded-lg border border-white/10 bg-[#1b1b1b] p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#f5f3ee] flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#d8ff3e]" />
                      Anonymous contributor
                    </span>
                    <span className="text-[#6f6f6a] font-mono text-[11px]">3 hours ago</span>
                  </div>
                  <p className="text-sm text-[#f5f3ee]/90 leading-relaxed">
                    “Could we validate the first phase with ten pilot customers before enforcing phase two? This would significantly reduce implementation risk and give engineering breathing room.”
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#181818] p-5 space-y-2 ml-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#d8ff3e] flex items-center gap-1.5">
                      <CornerDownRight className="h-3.5 w-3.5" />
                      Author (Head of Product)
                    </span>
                    <span className="text-[#6f6f6a] font-mono text-[11px]">1 hour ago</span>
                  </div>
                  <p className="text-sm text-[#9a9a95] leading-relaxed">
                    “This is very sensible. We will split the milestone into two separate reviews and only commit to phase two after gathering initial metrics.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            07 — CONSTRUCTIVE FEEDBACK PRINCIPLES
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="border-t border-white/10 pt-16 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
              07 / Constructive Philosophy
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-h1 font-display text-[#f5f3ee] tracking-tight">
                Anonymous does not
                <br />
                mean careless.
              </h2>
              <p className="text-base text-[#9a9a95] max-w-md leading-relaxed">
                FeedbackFlow is built specifically to discourage vague complaints or personal attacks. The composer actively guides users toward high-impact, constructive critique.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-3">
              <div className="text-[#d8ff3e] font-mono text-xs uppercase tracking-wider font-semibold">
                Guideline 01
              </div>
              <h3 className="text-base font-bold font-display text-[#f5f3ee]">
                Explain what isn't working
              </h3>
              <p className="text-xs text-[#9a9a95] leading-relaxed">
                Specify the exact gap, ambiguity, or friction instead of generalized sentiment.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-3">
              <div className="text-[#d8ff3e] font-mono text-xs uppercase tracking-wider font-semibold">
                Guideline 02
              </div>
              <h3 className="text-base font-bold font-display text-[#f5f3ee]">
                Suggest an alternative
              </h3>
              <p className="text-xs text-[#9a9a95] leading-relaxed">
                Offer a concrete proposal or counter-path so the author can immediately take action.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-3">
              <div className="text-[#d8ff3e] font-mono text-xs uppercase tracking-wider font-semibold">
                Guideline 03
              </div>
              <h3 className="text-base font-bold font-display text-[#f5f3ee]">
                Give an example
              </h3>
              <p className="text-xs text-[#9a9a95] leading-relaxed">
                Ground your observation in an actual scenario, customer case, or edge scenario.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-3">
              <div className="text-[#d8ff3e] font-mono text-xs uppercase tracking-wider font-semibold">
                Guideline 04
              </div>
              <h3 className="text-base font-bold font-display text-[#f5f3ee]">
                Focus on the work
              </h3>
              <p className="text-xs text-[#9a9a95] leading-relaxed">
                Critique the ideas, code, copy, or decisions — never the character or competence of the creator.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            08 — MEETINGS & RESOURCES (EDITORIAL LIBRARY)
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-16">
            {/* Meetings column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
                08 / Asynchronous Syncs
              </span>
              <h2 className="text-h2 font-display text-[#f5f3ee] tracking-tight">
                Feedback shouldn't disappear when the meeting ends.
              </h2>
              <p className="text-sm sm:text-base text-[#9a9a95] leading-relaxed">
                Transform status meetings into structured, living records with pre-reads and asynchronous follow-up reflections.
              </p>
              <div className="pt-2">
                <Link href="/meeting-notes">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="h-4 w-4 text-[#d8ff3e]" />
                    Explore Meeting Notes
                  </Button>
                </Link>
              </div>
            </div>

            {/* Resources column: Editorial Library */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
                09 / Editorial Library
              </span>
              <h2 className="text-h2 font-display text-[#f5f3ee] tracking-tight">
                Curated thoughts on feedback culture
              </h2>

              <div className="divide-y divide-white/10 border-y border-white/10">
                <Link
                  href="/resources"
                  className="py-4 flex items-center justify-between group hover:text-[#d8ff3e] transition-colors"
                >
                  <span className="text-sm sm:text-base font-medium text-[#f5f3ee] group-hover:text-[#d8ff3e]">
                    How to build a genuine feedback culture without fear
                  </span>
                  <span className="text-xs font-mono text-[#9a9a95] shrink-0 ml-4">
                    5 min read
                  </span>
                </Link>

                <Link
                  href="/anonymous-feedback"
                  className="py-4 flex items-center justify-between group hover:text-[#d8ff3e] transition-colors"
                >
                  <span className="text-sm sm:text-base font-medium text-[#f5f3ee] group-hover:text-[#d8ff3e]">
                    Anonymous workplace feedback: when, why, and how
                  </span>
                  <span className="text-xs font-mono text-[#9a9a95] shrink-0 ml-4">
                    7 min read
                  </span>
                </Link>

                <Link
                  href="/resources"
                  className="py-4 flex items-center justify-between group hover:text-[#d8ff3e] transition-colors"
                >
                  <span className="text-sm sm:text-base font-medium text-[#f5f3ee] group-hover:text-[#d8ff3e]">
                    How engineering managers can constructively receive criticism
                  </span>
                  <span className="text-xs font-mono text-[#9a9a95] shrink-0 ml-4">
                    6 min read
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            10 — FINAL CTA (SECTION 59)
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="rounded-xl border border-white/15 bg-[#141414] p-8 sm:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#d8ff3e] uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8ff3e]" />
              Start fearless communication
            </div>

            <h2 className="text-h1 font-display text-[#f5f3ee] max-w-3xl mx-auto tracking-tight">
              The feedback you're afraid to give might be the feedback someone needs.
            </h2>

            <p className="text-base sm:text-xl text-[#9a9a95] max-w-2xl mx-auto leading-relaxed">
              Give people a safer way to say what they really think — clearly, constructively, and anonymously.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/app">
                <Button size="lg" className="w-full sm:w-auto text-sm font-semibold tracking-wide">
                  Give anonymous feedback →
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign in to workspace
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
