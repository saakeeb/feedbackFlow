import { notFound } from 'next/navigation';
import { resourceService } from '@/services/resource.service';
import ResourceDetail from '@/features/resources/components/ResourceDetail';

interface ResourceDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ResourceDetailPage({
  params,
}: ResourceDetailPageProps) {
  const { id } = await params;
  const resource = await resourceService.getResourceById(id);

  if (!resource) {
    notFound();
  }

  return <ResourceDetail resource={resource} />;
}
