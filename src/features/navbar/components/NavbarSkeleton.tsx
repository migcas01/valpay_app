export function NavbarSkeleton() {
  return (
    <nav className="h-14 px-6 border-b border-gray-100 flex items-center justify-between bg-white">
      <div className="flex items-center gap-6">
        <div className="h-5 w-24 bg-gray-100 rounded" />
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-8 w-24 bg-gray-100 rounded-md" />
          ))}
        </div>
      </div>
      <div className="h-8 w-28 bg-gray-100 rounded-md" />
    </nav>
  );
}
