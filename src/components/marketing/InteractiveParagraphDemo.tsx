'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { ShieldCheck, MessageSquare, CornerDownRight, Check, Sparkles } from 'lucide-react';

interface ParagraphItem {
  id: string;
  text: string;
  feedback?: {
    author: string;
    text: string;
    reply?: {
      author: string;
      text: string;
    };
  };
}

const initialParagraphs: ParagraphItem[] = [
  {
    id: 'p1',
    text: 'Our engineering roadmap for Q3 prioritizes automated multi-region replication before addressing our developer onboarding pipeline.',
    feedback: {
      author: 'Anonymous contributor',
      text: 'Multi-region will serve fewer than 3% of our active traffic right now. Meanwhile, new hires still spend 4 days just getting a local environment running. Can we invert this priority?',
      reply: {
        author: 'Lead Architect',
        text: 'Valid point. Let us dedicate sprint 14 exclusively to local container virtualization before kicking off region replicas.',
      },
    },
  },
  {
    id: 'p2',
    text: 'All feature proposals will require a formal 12-page architecture review document submitted 10 days prior to sprint planning.',
  },
  {
    id: 'p3',
    text: 'We are deprecating synchronous design critiques in favor of async written reflections attached directly to functional prototypes.',
  },
];

export function InteractiveParagraphDemo() {
  const [paragraphs, setParagraphs] = useState<ParagraphItem[]>(initialParagraphs);
  const [selectedId, setSelectedId] = useState<string>('p2');
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedParagraph = paragraphs.find((p) => p.id === selectedId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim()) return;

    setParagraphs((prev) =>
      prev.map((p) => {
        if (p.id === selectedId) {
          return {
            ...p,
            feedback: {
              author: isAnonymous ? 'Anonymous contributor' : 'Teammate',
              text: feedbackInput,
            },
          };
        }
        return p;
      })
    );
    setFeedbackInput('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full rounded-xl border border-white/15 bg-[#141414] overflow-hidden shadow-2xl">
      {/* Document header bar */}
      <div className="border-b border-white/10 bg-[#0e0e0e] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#9a9a95] font-mono">
            Document / Internal Proposal
          </span>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-[#d8ff3e] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d8ff3e] animate-pulse" />
          Interactive Demo — Click any paragraph
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Document text with selectable paragraphs */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0f0f0f]">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9a9a95]">
              Engineering Memo · RFC-204
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#f5f3ee] tracking-tight">
              Operating Cadence & Architecture Priorities
            </h3>
          </div>

          <div className="space-y-4 pt-2">
            {paragraphs.map((p, idx) => {
              const isSelected = p.id === selectedId;
              const hasFeedback = Boolean(p.feedback);

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(p.id);
                    }
                  }}
                  className={`group relative p-4 rounded-lg cursor-pointer transition-all duration-150 border ${
                    isSelected
                      ? 'border-[#d8ff3e] bg-[#1a1a1a] shadow-md'
                      : 'border-white/5 bg-[#141414] hover:border-white/25 hover:bg-[#181818]'
                  }`}
                >
                  {/* Paragraph Number & Indicator */}
                  <div className="flex items-start justify-between gap-4">
                    <p className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'text-[#f5f3ee]' : 'text-[#f5f3ee]/85'}`}>
                      {p.text}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/5">
                    <span className="font-mono text-[11px] text-[#6f6f6a]">
                      § 0{idx + 1}
                    </span>

                    {hasFeedback ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#d8ff3e] font-medium">
                        <MessageSquare className="h-3 w-3" />
                        1 anonymous note attached
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#9a9a95] group-hover:text-[#d8ff3e] transition-colors">
                        Suggest improvement →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-[#6f6f6a] flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#d8ff3e]" />
            <span>Select a paragraph above to inspect attached feedback or add your constructive note.</span>
          </div>
        </div>

        {/* Right: Attached Feedback panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#141414] flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#9a9a95]">
                  Attached to § 0{paragraphs.findIndex((p) => p.id === selectedId) + 1}
                </span>
                <h4 className="text-base font-semibold font-display text-[#f5f3ee]">
                  Constructive Feedback
                </h4>
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-[#d8ff3e] bg-[#d8ff3e]/10 border border-[#d8ff3e]/30 px-2 py-0.5 rounded-full font-mono">
                <ShieldCheck className="h-3 w-3" />
                Identity hidden
              </div>
            </div>

            {/* Existing feedback on this paragraph */}
            {selectedParagraph?.feedback ? (
              <div className="space-y-3.5">
                <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#f5f3ee] flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#d8ff3e]" />
                      {selectedParagraph.feedback.author}
                    </span>
                    <span className="text-[#6f6f6a] font-mono text-[11px]">Verified Anonymous</span>
                  </div>
                  <p className="text-sm text-[#f5f3ee]/90 leading-relaxed">
                    “{selectedParagraph.feedback.text}”
                  </p>
                </div>

                {selectedParagraph.feedback.reply && (
                  <div className="ml-4 pl-4 border-l-2 border-white/20 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#d8ff3e]">
                      <CornerDownRight className="h-3 w-3" />
                      {selectedParagraph.feedback.reply.author}
                    </div>
                    <p className="text-xs text-[#9a9a95] leading-relaxed">
                      “{selectedParagraph.feedback.reply.text}”
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-white/15 p-4 text-center text-xs text-[#9a9a95] bg-white/2">
                No feedback on this paragraph yet. Be the first to share constructive input.
              </div>
            )}

            {/* Composer form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#f5f3ee]">
                  What would make this better?
                </label>
                <div className="text-[11px] text-[#9a9a95] space-y-0.5 pb-1">
                  <span className="block text-[#f5f3ee]/70 font-medium">Constructive guidance:</span>
                  <p>• Explain what isn't working</p>
                  <p>• Suggest a concrete alternative</p>
                  <p>• Focus on the work, not the person</p>
                </div>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="e.g. 12 pages creates heavy process overhead. Could we pilot a 2-page RFC template first?"
                  className="w-full rounded-md border border-white/20 bg-[#0e0e0e] p-3 text-sm text-[#f5f3ee] placeholder:text-[#6f6f6a] focus:border-[#d8ff3e] focus:outline-none focus:ring-1 focus:ring-[#d8ff3e] transition-colors"
                />
              </div>

              {/* Privacy state indicator */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-white/30 text-[#d8ff3e] focus:ring-[#d8ff3e] accent-[#d8ff3e]"
                  />
                  <span className="text-xs font-medium text-[#f5f3ee]">
                    Send anonymously
                  </span>
                </label>
                <span className="text-[11px] text-[#9a9a95] font-mono">
                  {isAnonymous ? '● Name decoupled' : '○ Name visible'}
                </span>
              </div>

              <Button
                type="submit"
                size="sm"
                className="w-full justify-center text-xs uppercase tracking-wider"
              >
                {isSubmitted ? (
                  <span className="inline-flex items-center gap-1.5 text-[#0b0b0b]">
                    <Check className="h-4 w-4" /> Feedback attached!
                  </span>
                ) : (
                  'Send constructive feedback →'
                )}
              </Button>
            </form>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-[#6f6f6a] leading-relaxed">
            Attached feedback remains visually anchored to the exact paragraph so context is never lost.
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveParagraphDemo;
