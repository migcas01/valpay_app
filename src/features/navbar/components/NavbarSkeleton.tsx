export function NavbarSkeleton() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
            <div className="flex items-center gap-1">
              <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-32 bg-gray-100 animate-pulse rounded-md" />
            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </nav>
  );
}
