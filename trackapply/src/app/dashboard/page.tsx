"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import { getApplications } from "@/lib/storage";
import { JobApplication, ApplicationStatus, STATUS_LABELS, STATUS_COLORS } from "@/types";
import { formatDate, daysAgo } from "@/lib/utils";

export default function DashboardPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setApps(getApplications());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statusCounts: Record<ApplicationStatus, number> = {
    saved: 0,
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
    withdrawn: 0,
  };
  apps.forEach((app) => statusCounts[app.status]++);

  const recentApps = apps.slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {apps.length === 0
              ? "Start tracking your job applications"
              : `Tracking ${apps.length} application${apps.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link href="/applications/new">
          <Button>+ Add Application</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <StatCard label="Saved" value={statusCounts.saved} icon="💾" color="bg-gray-100" />
        <StatCard label="Applied" value={statusCounts.applied} icon="📤" color="bg-blue-50" />
        <StatCard label="Interviewing" value={statusCounts.interviewing} icon="🎤" color="bg-amber-50" />
        <StatCard label="Offers" value={statusCounts.offer} icon="🎉" color="bg-green-50" />
        <StatCard label="Rejected" value={statusCounts.rejected} icon="❌" color="bg-red-50" />
        <StatCard label="Withdrawn" value={statusCounts.withdrawn} icon="↩️" color="bg-gray-50" />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        <Link href="/applications/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-2xl">➕</span>
              <div>
                <p className="font-semibold text-gray-900">Add Application</p>
                <p className="text-sm text-gray-500">Log a new job you applied to</p>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/cover-letter">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <div>
                <p className="font-semibold text-gray-900">Generate Cover Letter</p>
                <p className="text-sm text-gray-500">Create a tailored cover letter with AI</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          {apps.length > 0 && (
            <Link href="/applications" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
              View all
            </Link>
          )}
        </div>
        {apps.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-3xl mb-3">📭</p>
            <p className="text-gray-500 mb-4">No applications yet. Start tracking your job search!</p>
            <Link href="/applications/new">
              <Button>Add Your First Application</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentApps.map((app) => (
              <Link key={app.id} href={`/applications/${app.id}/edit`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer mb-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{app.role}</p>
                      <p className="text-sm text-gray-500 truncate">{app.company}{app.location ? ` · ${app.location}` : ""}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4 shrink-0">
                      <Badge className={STATUS_COLORS[app.status]}>{STATUS_LABELS[app.status]}</Badge>
                      <span className="text-xs text-gray-400">{daysAgo(app.appliedDate || app.createdAt)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
