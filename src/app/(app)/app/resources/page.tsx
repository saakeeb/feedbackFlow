import { resourceService } from '@/services/resource.service';
import ResourceList from '@/features/resources/components/ResourceList';

export const dynamic = 'force-dynamic';

export default async function ResourcesPage() {
  const resources = await resourceService.getResources();

  return <ResourceList initialResources={resources} />;
}
