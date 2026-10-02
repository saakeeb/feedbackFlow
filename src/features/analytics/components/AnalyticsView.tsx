'use client';

import React from 'react';
import type { AnalyticsOverview } from '@/types/common';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { MessageSquare, Users, ShieldCheck, BarChart3, TrendingUp } from 'lucide-react';

interface AnalyticsViewProps {
  overview: AnalyticsOverview;
}

export function AnalyticsView({ overview }: AnalyticsViewProps) {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Engagement & Feedback Insights
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Answering key questions on team transparency, psychological safety, and participation trends.
        </p>
      </div>

      {/* Key Metrics directly tied to workplace questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <Card>
          <CardHeader>
            <CardDescription className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Participation Volume
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-slate-900 pt-1">
              {overview.totalFeedback}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">
              Total reflections collected across {overview.totalTopics} active topics.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{overview.avgResponsesPerTopic} avg. responses per topic</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card>
          <CardHeader>
            <CardDescription className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Psychological Safety Rate
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-slate-900 pt-1 flex items-center gap-2">
              {overview.anonymousRatio}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">
              Percentage of team submissions utilizing anonymous mode to share candid critiques safely.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Identity scrubbed per privacy policy</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card>
          <CardHeader>
            <CardDescription className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Active Topics
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-slate-900 pt-1">
              {overview.totalTopics}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">
              Open discussion prompts initiated by team leads and members.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Users className="h-3.5 w-3.5" />
              <span>~{overview.activeContributors} unique contributors</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Topics by Domain</CardTitle>
            <CardDescription>
              Which areas of the company generate the most discussion?
            </CardDescription>
          </CardHeader>
          <CardContent>
            {overview.categoryBreakdown.length > 0 ? (
              <div className="space-y-3">
                {overview.categoryBreakdown.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>{item.category}</span>
                      <span>{item.count} topics</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-slate-800 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (item.count / Math.max(overview.totalTopics, 1)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No category data available yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity by Weekday</CardTitle>
            <CardDescription>
              Timing distribution of honest feedback and reflection submissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-40 pt-4 px-2">
              {overview.recentActivityTrends.map((trend) => (
                <div key={trend.date} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-semibold text-slate-700">
                    {trend.submissions}
                  </span>
                  <div
                    className="w-8 rounded-t bg-slate-900 transition-all"
                    style={{
                      height: `${Math.max(
                        12,
                        Math.min(100, trend.submissions * 16)
                      )}px`,
                    }}
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    {trend.date}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 text-center">
              Mid-week sprints show highest asynchronous communication density.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AnalyticsView;
