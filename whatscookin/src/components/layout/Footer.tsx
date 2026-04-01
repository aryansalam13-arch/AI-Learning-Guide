export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍳</span>
            <span className="text-sm font-medium text-gray-900">WhatsCookin</span>
          </div>
          <p className="text-xs text-gray-500">Stop wasting food. Start cooking smarter.</p>
        </div>
      </div>
    </footer>
  );
}
