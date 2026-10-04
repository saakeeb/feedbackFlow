import Link from 'next/link';
import Button from '@/components/ui/Button';
import { resourceService } from '@/services/resource.service';
import ResourceCard from '@/features/resources/components/ResourceCard';
import { constructMetadata } from '@/lib/seo/metadata';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Workplace Templates, Checklists & Guides — FeedbackFlow',
  description:
    'Free frameworks and templates for 1-on-1 meetings, anonymous feedback etiquette, pre-meeting checklists, and psychological safety handbooks.',
  canonical: '/resources',
});

export default async function PublicResourcesPage() {
  const resources = await resourceService.getResources();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 sm:px-8 space-y-20">
      {/* Editorial Header */}
      <div className="space-y-6 border-b border-white/10 pb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
          09 / Editorial Library
        </span>
        <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase leading-[0.98]">
          Curated
          <br />
          Thoughts.
        </h1>
        <p className="text-lg sm:text-xl text-[#9a9a95] leading-relaxed max-w-3xl">
          Actionable resources designed to help engineering managers, product leads, and team contributors foster psychological safety and run effective syncs.
        </p>
      </div>

      {/* Editorial List */}
      <div className="space-y-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Bottom CTA Card */}
      <div className="rounded-xl border border-white/15 bg-[#141414] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <h3 className="font-bold font-display text-xl sm:text-2xl text-[#f5f3ee] tracking-tight">
            Need a workspace to organize your team?
          </h3>
          <p className="text-xs sm:text-sm text-[#9a9a95]">
            Access these resources directly within FeedbackFlow alongside live feedback boards.
          </p>
        </div>
        <Link href="/app">
          <Button size="lg" className="gap-2 shrink-0">
            Open Workspace
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
