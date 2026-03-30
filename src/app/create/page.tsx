"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  OutputFormat,
  OUTPUT_FORMAT_LABELS,
  OUTPUT_FORMAT_ICONS,
  FREE_TIER_LIMIT,
} from "@/types";
import { getUsage, incrementUsage, saveResult } from "@/lib/storage";
import { generateId } from "@/lib/utils";

const ALL_FORMATS: OutputFormat[] = [
  "twitter",
  "linkedin",
  "email",
  "instagram",
  "blog_summary",
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "witty", label: "Witty" },
  { value: "inspirational", label: "Inspirational" },
];

export default function CreatePage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<OutputFormat[]>([
    "twitter",
    "linkedin",
  ]);
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const usage = getUsage();
  const remaining = FREE_TIER_LIMIT - usage.count;
  const isOverLimit = remaining <= 0;

  const toggleFormat = (format: OutputFormat) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Please paste some content first.");
      return;
    }
    if (selectedFormats.length === 0) {
      setError("Select at least one output format.");
      return;
    }
    if (isOverLimit) {
      setError("You've used all your free repurposes this month. Upgrade to Pro for unlimited access.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, formats: selectedFormats, tone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();

      const result = {
        id: generateId(),
        originalContent: content.slice(0, 500),
        outputs: data.outputs,
        tone,
        createdAt: new Date().toISOString(),
      };

      saveResult(result);
      incrementUsage();

      router.push(`/results/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Repurpose Your Content</h1>
        <p className="mt-2 text-gray-600">
          Paste your content below and choose the platforms you want to target.
        </p>
        <div className="mt-3">
          {isOverLimit ? (
            <Badge variant="warning">Free limit reached (0 remaining)</Badge>
          ) : (
            <Badge variant="info">{remaining} free repurpose{remaining !== 1 ? "s" : ""} remaining</Badge>
          )}
        </div>
      </div>

      {/* Content Input */}
      <Card className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your blog post, article, video transcript, notes, or any content here..."
          rows={10}
          maxLength={15000}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
        />
        <p className="mt-1.5 text-xs text-gray-500 text-right">
          {content.length.toLocaleString()} / 15,000 characters
        </p>
      </Card>

      {/* Format Selection */}
      <Card className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Output Formats
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ALL_FORMATS.map((format) => {
            const selected = selectedFormats.includes(format);
            return (
              <button
                key={format}
                onClick={() => toggleFormat(format)}
                className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                  selected
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <span className="text-lg">{OUTPUT_FORMAT_ICONS[format]}</span>
                {OUTPUT_FORMAT_LABELS[format]}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Tone Selection */}
      <Card className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                tone === t.value
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        loading={loading}
        disabled={isOverLimit}
      >
        {loading ? "Repurposing..." : "Repurpose Content"}
      </Button>

      {loading && (
        <p className="mt-4 text-center text-sm text-gray-500">
          This usually takes 10-15 seconds. Hang tight!
        </p>
      )}
    </div>
  );
}
