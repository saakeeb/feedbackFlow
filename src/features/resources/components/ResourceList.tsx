'use client';

import React, { useState, useMemo } from 'react';
import type { Resource } from '@/types/common';
import ResourceCard from './ResourceCard';
import EmptyState from '@/components/ui/EmptyState';
import { RESOURCE_CATEGORIES } from '@/lib/constants';
import { BookOpen, Search } from 'lucide-react';

interface ResourceListProps {
  initialResources: Resource[];
}

export function ResourceList({ initialResources }: ResourceListProps) {
  const [resources] = useState<Resource[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'all' || r.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [resources, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Workplace Resources & Handbooks
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Verified team templates, psychological safety guides, and meeting preparation frameworks.
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guidelines, templates, tags..."
            className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources list */}
      {filteredResources.length > 0 ? (
        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen className="h-8 w-8" />}
          title="No resources found"
          description="Try selecting another category or searching with different keywords."
        />
      )}
    </div>
  );
}

export default ResourceList;
