import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Terms of Service — FeedbackFlow',
  description:
    'FeedbackFlow Terms of Service governing the use of feedback boards, meeting notes, and workspace tools.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 sm:px-8 space-y-12">
      <div className="space-y-4 border-b border-white/10 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
          Operating Terms
        </span>
        <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase leading-[0.98]">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-[#9a9a95]">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-[#9a9a95] leading-relaxed max-w-3xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using FeedbackFlow, you agree to comply with and be bound by these Terms of Service. If you are using FeedbackFlow on behalf of an organization, you represent that you have authority to bind that entity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            2. Acceptable Use
          </h2>
          <p>
            FeedbackFlow is built for honest, constructive workplace collaboration. You agree not to use the platform for unlawful harassment, defamatory attacks, or uploading harmful malicious payloads. Anonymous does not mean careless.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            3. Workspace Ownership
          </h2>
          <p>
            Your organization retains all ownership rights over content submitted to topics, meeting notes, and internal resources. We do not claim intellectual property over your workspace materials.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            4. Limitation of Liability
          </h2>
          <p>
            FeedbackFlow provides the software on an "as is" and "as available" basis without warranties of any kind. In no event shall FeedbackFlow be liable for indirect, incidental, or consequential damages.
          </p>
        </section>
      </div>
    </div>
  );
}
