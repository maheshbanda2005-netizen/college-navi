'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-lg w-full text-center p-10">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center text-4xl mb-6">🚨</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Unexpected Error</h1>
            <p className="text-gray-600 mb-6">Something went critically wrong. Please try again.</p>
            <button
              onClick={reset}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all"
            >
              🔄 Reload Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}