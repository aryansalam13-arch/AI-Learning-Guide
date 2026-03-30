"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import { getResults } from "@/lib/storage";
import { RepurposeResult, OUTPUT_FORMAT_LABELS, OUTPUT_FORMAT_ICONS, OutputFormat } from "@/types";
import { formatDate } from "@/lib/utils";

export default function ResultsPage() {
  const params = useParams();
  const [result, setResult] = useState<RepurposeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const results = getResults();
    const found = results.find((r) => r.id === params.id);
    setResult(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-96 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Result not found</h1>
        <p className="mt-2 text-gray-600">This result may have been deleted or doesn&apos;t exist.</p>
        <Link href="/create" className="mt-6 inline-block">
          <Button>Create New</Button>
        </Link>
      </div>
    );
  }

  const formats = Object.keys(result.outputs) as OutputFormat[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Repurposed Content</h1>
          <p className="mt-1 text-sm text-gray-500">
            Created {formatDate(result.createdAt)} &middot; {result.tone} tone
          </p>
        </div>
        <Link href="/create">
          <Button variant="secondary" size="sm">New Repurpose</Button>
        </Link>
      </div>

      {/* Original content preview */}
      <Card className="mb-8 bg-gray-50">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Original Content</p>
        <p className="text-sm text-gray-700 line-clamp-3">{result.originalContent}</p>
      </Card>

      {/* Outputs */}
      <div className="space-y-6">
        {formats.map((format) => (
          <Card key={format}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">{OUTPUT_FORMAT_ICONS[format]}</span>
                <h2 className="font-semibold text-gray-900">
                  {OUTPUT_FORMAT_LABELS[format]}
                </h2>
              </div>
              <CopyButton text={result.outputs[format]} />
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                {result.outputs[format]}
              </pre>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Link href="/create">
          <Button size="lg">Repurpose More Content</Button>
        </Link>
      </div>
    </div>
  );
}
