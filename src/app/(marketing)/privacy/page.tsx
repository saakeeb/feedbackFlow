import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Privacy Policy & Anonymity Disclosures — FeedbackFlow',
  description:
    'Our strict architectural privacy policies. How we scrub identifiers for anonymous submissions, handle data isolation, and comply with GDPR.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 sm:px-8 space-y-12">
      <div className="space-y-4 border-b border-white/10 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
          Legal & Privacy Architecture
        </span>
        <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase leading-[0.98]">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#9a9a95]">
          Last updated: October 2026 • Verified PostgreSQL row-level privacy
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-[#9a9a95] leading-relaxed max-w-3xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            1. Anonymity Enforcement
          </h2>
          <p>
            When you submit feedback with the “Send anonymously” toggle enabled, our application and database layers explicitly decouple the record by setting the author’s user ID column to null. No foreign key, index, or internal relational link connects your user profile or authentication session to that row.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            2. Metadata Scrubbing
          </h2>
          <p>
            Client IP addresses, browser user agent strings, and hardware fingerprints are stripped from anonymous submission payloads. Workspace administrators and team leads cannot inspect correlating telemetry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            3. Account & Workspace Data
          </h2>
          <p>
            When you create an account, we store your email, full name, and avatar URL to authenticate you into your workspace. We use industry-standard encryption in transit (HTTPS/TLS) and at rest via Supabase PostgreSQL infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
            4. Third-Party Sharing
          </h2>
          <p>
            FeedbackFlow does not sell personal information or team conversations to third-party data brokers or advertising networks. We use essential infrastructure providers solely to host the application reliably.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-[#f5f3ee]">
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
