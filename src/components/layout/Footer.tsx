export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-600 text-white font-bold text-xs">
              R
            </div>
            <span className="text-sm font-medium text-gray-900">Repurpose</span>
          </div>
          <p className="text-sm text-gray-500">
            Turn one piece of content into many. Save hours every week.
          </p>
        </div>
      </div>
    </footer>
  );
}
