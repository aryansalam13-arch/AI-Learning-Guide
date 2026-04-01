export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-600 text-white font-bold text-xs">
              T
            </div>
            <span className="text-sm font-medium text-gray-900">TrackApply</span>
          </div>
          <p className="text-xs text-gray-500">
            Track smarter. Land faster.
          </p>
        </div>
      </div>
    </footer>
  );
}
