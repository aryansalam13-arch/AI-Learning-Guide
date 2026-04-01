"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getUsage, incrementCoverLetterUsage, getSavedResume, saveResume } from "@/lib/storage";
import { FREE_TIER_LIMIT } from "@/types";

export default function CoverLetterPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeSummary, setResumeSummary] = useState("");
  const [tone, setTone] = useState("professional");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setResumeSummary(getSavedResume());
    setMounted(true);
  }, []);

  const usage = mounted ? getUsage() : { coverLettersGenerated: 0, resetDate: "" };
  const remaining = FREE_TIER_LIMIT - usage.coverLettersGenerated;
  const isOverLimit = remaining <= 0;

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }
    if (!resumeSummary.trim()) {
      setError("Please provide your resume or background summary.");
      return;
    }
    if (isOverLimit) {
      setError("You've used all your free cover letters this month. Upgrade to Pro for unlimited access.");
      return;
    }

    setError("");
    setCoverLetter("");
    setLoading(true);

    // Save resume for future use
    saveResume(resumeSummary);

    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          resumeSummary,
          tone,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      setCoverLetter(data.coverLetter);
      incrementCoverLetterUsage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Cover Letter Generator</h1>
        <p className="mt-2 text-gray-600">
          Paste a job description and your background — get a tailored cover letter in seconds.
        </p>
        {mounted && (
          <div className="mt-3">
            {isOverLimit ? (
              <Badge className="bg-amber-100 text-amber-700">Free limit reached (0 remaining)</Badge>
            ) : (
              <Badge className="bg-brand-100 text-brand-700">
                {remaining} free cover letter{remaining !== 1 ? "s" : ""} remaining
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Job Description */}
      <Card className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description *
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={8}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
        />
      </Card>

      {/* Resume / Background */}
      <Card className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Resume / Background *
        </label>
        <textarea
          value={resumeSummary}
          onChange={(e) => setResumeSummary(e.target.value)}
          placeholder="Paste your resume, or write a summary of your experience, skills, and achievements..."
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
        />
        <p className="mt-1.5 text-xs text-gray-500">
          Your resume is saved locally for next time.
        </p>
      </Card>

      {/* Tone */}
      <Card className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">Tone</label>
        <div className="flex gap-2">
          {[
            { value: "professional", label: "Professional" },
            { value: "enthusiastic", label: "Enthusiastic" },
            { value: "concise", label: "Concise" },
          ].map((t) => (
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

      {/* Generate */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleGenerate}
        loading={loading}
        disabled={isOverLimit}
      >
        {loading ? "Generating..." : "Generate Cover Letter"}
      </Button>

      {loading && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Crafting your cover letter... this takes about 10 seconds.
        </p>
      )}

      {/* Result */}
      {coverLetter && (
        <Card className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Your Cover Letter</h2>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                copied
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-lg bg-gray-50 p-5">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
              {coverLetter}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
}
