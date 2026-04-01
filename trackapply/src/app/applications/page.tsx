"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getApplications, deleteApplication } from "@/lib/storage";
import {
  JobApplication,
  ApplicationStatus,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/types";
import { daysAgo } from "@/lib/utils";

const FILTER_OPTIONS: { value: ApplicationStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "saved", label: "Saved" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setApps(getApplications());
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this application?")) return;
    deleteApplication(id);
    setApps(getApplications());
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-20 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const filtered =
    filter === "all" ? apps : apps.filter((a) => a.status === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">{apps.length} total</p>
        </div>
        <Link href="/applications/new">
          <Button>+ Add Application</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              filter === opt.value
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && (
              <span className="ml-1.5 opacity-70">
                {apps.filter((a) => a.status === opt.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {apps.length === 0
              ? "No applications yet."
              : "No applications match this filter."}
          </p>
          {apps.length === 0 && (
            <Link href="/applications/new">
              <Button>Add Your First</Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/applications/${app.id}/edit`}
                  className="flex-1 min-w-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{app.role}</p>
                      <p className="text-sm text-gray-500">
                        {app.company}
                        {app.location ? ` · ${app.location}` : ""}
                      </p>
                      {app.salary && (
                        <p className="text-sm text-green-600 mt-1">
                          {app.salary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge className={STATUS_COLORS[app.status]}>
                      {STATUS_LABELS[app.status]}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {daysAgo(app.appliedDate || app.createdAt)}
                    </span>
                    {app.notes && (
                      <span className="text-xs text-gray-400 truncate max-w-[200px]">
                        {app.notes}
                      </span>
                    )}
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="shrink-0 rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
