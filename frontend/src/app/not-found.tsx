import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card max-w-lg w-full text-center p-10">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}