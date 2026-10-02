import { analyticsService } from '@/services/analytics.service';
import AnalyticsView from '@/features/analytics/components/AnalyticsView';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const overview = await analyticsService.getOverview();

  return <AnalyticsView overview={overview} />;
}
