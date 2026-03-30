"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getResults, deleteResult, getUsage } from "@/lib/storage";
import { RepurposeResult, OUTPUT_FORMAT_LABELS, OutputFormat, FREE_TIER_LIMIT } from "@/types";
import { formatDate } from "@/lib/utils";

export default function HistoryPage() {
  const [results, setResults] = useState<RepurposeResult[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setResults(getResults());
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    deleteResult(id);
    setResults(getResults());
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const usage = getUsage();
  const remaining = FREE_TIER_LIMIT - usage.count;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">History</h1>
          <p className="mt-1 text-gray-600">Your previously repurposed content.</p>
        </div>
        <div className="text-right">
          <Badge variant={remaining > 0 ? "info" : "warning"}>
            {remaining > 0 ? `${remaining} free left` : "Limit reached"}
          </Badge>
        </div>
      </div>

      {results.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No repurposed content yet.</p>
          <Link href="/create">
            <Button>Create Your First</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((result) => {
            const formats = Object.keys(result.outputs) as OutputFormat[];
            return (
              <Card key={result.id} hover>
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/results/${result.id}`} className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 line-clamp-2 mb-2">
                      {result.originalContent}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {formats.map((f) => (
                        <Badge key={f} variant="default">
                          {OUTPUT_FORMAT_LABELS[f]}
                        </Badge>
                      ))}
                      <span className="text-xs text-gray-400">
                        {formatDate(result.createdAt)}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(result.id);
                    }}
                    className="shrink-0 rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
