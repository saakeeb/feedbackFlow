import Link from 'next/link';
import Button from '@/components/ui/Button';
import { resourceService } from '@/services/resource.service';
import ResourceCard from '@/features/resources/components/ResourceCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Workplace Templates, Checklists & Guides — FeedbackFlow',
  description:
    'Free frameworks and templates for 1-on-1 meetings, anonymous feedback etiquette, pre-meeting checklists, and psychological safety handbooks.',
  canonical: '/resources',
});

export default async function PublicResourcesPage() {
  const resources = await resourceService.getResources();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-12">
      <div className="space-y-4 border-b border-slate-200 pb-8 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Curated templates & operating handbooks
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          Actionable resources designed to help engineering managers, product leads, and team contributors foster psychological safety and run effective syncs.
        </p>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-base">
            Need a workspace to organize your team?
          </h3>
          <p className="text-xs text-slate-500">
            Access these resources directly within FeedbackFlow alongside live feedback boards.
          </p>
        </div>
        <Link href="/app">
          <Button size="sm">Open Workspace</Button>
        </Link>
      </div>
    </div>
  );
}
