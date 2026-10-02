import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Privacy Policy & Anonymity Disclosures — FeedbackFlow',
  description:
    'Our strict architectural privacy policies. How we scrub identifiers for anonymous submissions, handle data isolation, and comply with GDPR.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-8">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: October 2026 • Effective immediately
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            1. Anonymity Enforcement
          </h2>
          <p>
            When you submit a comment or reflection with the "Submit anonymously" toggle enabled, our server and database layers explicitly set the author’s user ID to null. No database relationship connects your user account or login session to that feedback row.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            2. Metadata Scrubbing
          </h2>
          <p>
            We strip IP addresses, user agent strings, and system fingerprints from anonymous feedback payloads. Workspace administrators and moderators cannot view identifying telemetry for anonymous submissions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            3. Account & Workspace Data
          </h2>
          <p>
            When you create an account, we store your email, full name, and avatar URL to authenticate you into your workspace. We use industry-standard encryption in transit (HTTPS/TLS) and at rest via Supabase PostgreSQL infrastructure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            4. Third-Party Sharing
          </h2>
          <p>
            FeedbackFlow does not sell personal information or data to third-party data brokers or advertising networks. We use essential service providers (e.g. Supabase, hosting infrastructure) exclusively to provide application functionality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            5. Contact
          </h2>
          <p>
            For privacy inquiries or deletion requests, contact privacy@feedbackflow.app.
          </p>
        </section>
      </div>
    </div>
  );
}
