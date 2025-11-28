import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-2">College Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The college you're looking for doesn't exist in our database.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
