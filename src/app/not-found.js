import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <h1 className="font-display text-3xl text-ink-950">Page Not Found</h1>
      <p className="mt-3 max-w-md text-steel-500">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  );
}
