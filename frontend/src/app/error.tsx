'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card max-w-lg w-full text-center p-10">
        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center text-4xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
        <p className="text-gray-600 mb-2">
          An unexpected error occurred while loading this page.
        </p>
        <p className="text-sm text-gray-400 mb-6 break-all">{error.message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            🔄 Try Again
          </button>
          <a href="/" className="btn-secondary inline-flex items-center justify-center">
            🏠 Go Home
          </a>
        </div>
      </div>
    </div>
  );
}