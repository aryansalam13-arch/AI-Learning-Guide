import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: "🔄",
    title: "One Input, Many Outputs",
    description:
      "Paste a blog post, video transcript, or any content. Get it instantly transformed into multiple platform-ready formats.",
  },
  {
    icon: "🎯",
    title: "Platform-Optimized",
    description:
      "Each output is tailored for its platform — tweet-length threads, professional LinkedIn posts, engaging email newsletters.",
  },
  {
    icon: "⚡",
    title: "Seconds, Not Hours",
    description:
      "What used to take hours of rewriting now takes seconds. Generate all your social content in one click.",
  },
];

const steps = [
  { number: "1", title: "Paste Your Content", description: "Drop in any blog post, article, notes, or transcript." },
  { number: "2", title: "Pick Your Platforms", description: "Choose which formats you need — Twitter, LinkedIn, email, and more." },
  { number: "3", title: "Copy & Post", description: "Get polished, platform-ready content. Just copy and publish." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 mb-6">
          Save hours every week
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Turn one piece of content
          <br />
          <span className="text-brand-600">into many</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Paste your blog post, video transcript, or any content. Instantly get
          platform-ready versions for Twitter, LinkedIn, email newsletters, and
          more.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/create">
            <Button size="lg">Start Repurposing</Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="secondary" size="lg">
              How It Works
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">3 free repurposes per month. No credit card required.</p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Why creators love Repurpose
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white text-lg font-bold">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/create">
              <Button size="lg">Try It Free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Simple pricing</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
          <Card className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Free</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">$0</p>
            <p className="text-sm text-gray-500">per month</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> 3 repurposes per month</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> All output formats</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Copy to clipboard</li>
            </ul>
          </Card>
          <Card className="text-left border-brand-600 border-2 relative">
            <div className="absolute -top-3 left-4 bg-brand-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Popular
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">$12</p>
            <p className="text-sm text-gray-500">per month</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Unlimited repurposes</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> All output formats</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Tone customization</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> History &amp; saved outputs</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Priority support</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
