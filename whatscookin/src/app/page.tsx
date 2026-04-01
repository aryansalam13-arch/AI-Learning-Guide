import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: "🧊",
    title: "Type What You Have",
    description: "List whatever's in your fridge, pantry, or countertop. No measuring needed — just type it out.",
  },
  {
    icon: "🤖",
    title: "AI Creates Your Recipe",
    description: "Our AI chef designs a delicious recipe using YOUR ingredients. No grocery run needed.",
  },
  {
    icon: "💰",
    title: "Save Money",
    description: "American families waste ~$1,500/year on food. Cook what you have instead of ordering takeout.",
  },
  {
    icon: "📱",
    title: "Save Your Favorites",
    description: "Keep a personal cookbook of recipes that worked. Come back to them anytime.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center">
        <p className="text-5xl mb-6">🍳</p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          What&apos;s in your fridge?
          <br />
          <span className="text-orange-500">We&apos;ll tell you what to cook.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
          Type your ingredients. Get a delicious recipe in seconds.
          Stop wasting food and save money on groceries.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/cook">
            <Button size="lg">Start Cooking</Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">5 free recipes per month. No account needed.</p>
      </section>

      {/* Demo */}
      <section className="mx-auto max-w-2xl px-4 py-8">
        <Card className="bg-orange-50 border-orange-100">
          <p className="text-sm font-medium text-orange-700 mb-3">Example</p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">You type:</span>{" "}
            &quot;chicken thighs, rice, bell peppers, soy sauce, garlic&quot;
          </p>
          <p className="text-gray-700">
            <span className="font-medium">You get:</span>{" "}
            A full recipe for Garlic Soy Chicken Stir-Fry with step-by-step instructions, cook time, and pro tips.
          </p>
        </Card>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <Card key={f.title}>
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Social proof / stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-orange-500">$1,500</p>
              <p className="mt-1 text-sm text-gray-500">Avg food waste per family/year</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">10 sec</p>
              <p className="mt-1 text-sm text-gray-500">Average recipe generation time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">$0</p>
              <p className="mt-1 text-sm text-gray-500">To get started</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Cheaper than takeout</h2>
        <p className="mt-2 text-gray-600">Pays for itself with one meal you don&apos;t throw away.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-xl mx-auto">
          <Card className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Free</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">$0</p>
            <p className="text-sm text-gray-500">forever</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> 5 recipes per month</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Save favorites</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> All dietary filters</li>
            </ul>
          </Card>
          <Card className="text-left border-orange-500 border-2 relative">
            <div className="absolute -top-3 left-4 bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Best Value
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">$4.99</p>
            <p className="text-sm text-gray-500">per month</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Unlimited recipes</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Save favorites</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> All dietary filters</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Meal prep mode</li>
              <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Nutritional info</li>
            </ul>
          </Card>
        </div>
        <div className="mt-12">
          <Link href="/cook">
            <Button size="lg">Start Cooking Free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
