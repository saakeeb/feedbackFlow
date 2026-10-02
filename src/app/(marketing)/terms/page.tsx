import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Terms of Service — FeedbackFlow',
  description:
    'FeedbackFlow Terms of Service governing the use of feedback boards, meeting notes, and workspace tools.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-8">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using FeedbackFlow, you agree to comply with and be bound by these Terms of Service. If you are using FeedbackFlow on behalf of an organization, you represent that you have authority to bind that entity.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            2. Acceptable Use
          </h2>
          <p>
            FeedbackFlow is designed for honest, constructive workplace collaboration. You agree not to use the platform for unlawful harassment, defamatory attacks, or uploading harmful malicious payloads.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            3. Workspace Ownership
          </h2>
          <p>
            Your organization retains all ownership rights over content submitted to topics, meeting notes, and internal resources. We do not claim intellectual property over your workspace materials.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
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
