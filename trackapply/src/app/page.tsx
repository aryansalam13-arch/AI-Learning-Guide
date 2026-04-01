import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: "📋",
    title: "Track Every Application",
    description: "Log company, role, status, salary, contacts, and notes. Never lose track of where you applied.",
  },
  {
    icon: "🤖",
    title: "AI Cover Letters",
    description: "Paste a job description and get a tailored cover letter in seconds. No more staring at blank pages.",
  },
  {
    icon: "📊",
    title: "Visual Dashboard",
    description: "See your pipeline at a glance — how many applied, interviewing, offers, and more.",
  },
  {
    icon: "🔒",
    title: "100% Private",
    description: "All your data stays in your browser. No sign-up required. No data leaves your device.",
  },
];

const stats = [
  { value: "21-80", label: "Applications per job search" },
  { value: "2+ hrs", label: "Saved per cover letter" },
  { value: "$0", label: "To get started" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 mb-6">
          Your job search, organized
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Stop losing track of
          <br />
          <span className="text-brand-600">job applications</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          The average job seeker applies to 21-80 positions. TrackApply keeps every application
          organized and generates AI-powered cover letters — so you can focus on landing interviews.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg">Start Tracking</Button>
          </Link>
          <Link href="#features">
            <Button variant="secondary" size="lg">See Features</Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">Free to use. 3 AI cover letters per month included.</p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-brand-600">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Everything you need to land your next role
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Three steps to an organized job search
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { n: "1", title: "Add Applications", desc: "Log each job you apply to with company, role, and status." },
              { n: "2", title: "Track Progress", desc: "Update statuses as you move through interviews and offers." },
              { n: "3", title: "Generate Cover Letters", desc: "Paste a job description, get a tailored cover letter instantly." },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white text-lg font-bold">
                  {step.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Simple, affordable pricing</h2>
        <p className="mt-2 text-gray-600">Less than a coffee. More than worth it.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
          <Card className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Free</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">$0</p>
            <p className="text-sm text-gray-500">forever</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Unlimited application tracking</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Dashboard &amp; stats</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> 3 AI cover letters / month</li>
            </ul>
          </Card>
          <Card className="text-left border-brand-600 border-2 relative">
            <div className="absolute -top-3 left-4 bg-brand-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Best Value
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">$7</p>
            <p className="text-sm text-gray-500">per month</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Everything in Free</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Unlimited AI cover letters</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Multiple tone options</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Resume storage</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Priority AI generation</li>
            </ul>
          </Card>
        </div>
        <div className="mt-12">
          <Link href="/dashboard">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
