'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { FEEDBACK_CATEGORIES } from '@/lib/constants';

interface FeedbackFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: 'all' | 'active' | 'archived';
  onStatusChange: (status: 'all' | 'active' | 'archived') => void;
}

export function FeedbackFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
}: FeedbackFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter feedback topics..."
          className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        />
      </div>

      {/* Category Dropdown */}
      <div className="w-full sm:w-44">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs sm:text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          <option value="all">All Categories</option>
          {FEEDBACK_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Status Segmented Control */}
      <div className="inline-flex rounded-md border border-slate-200 bg-slate-100 p-0.5 text-xs">
        {(['all', 'active', 'archived'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={`px-3 py-1 font-medium capitalize rounded transition-colors ${
              selectedStatus === status
                ? 'bg-white text-slate-900 shadow-subtle'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FeedbackFilters;
