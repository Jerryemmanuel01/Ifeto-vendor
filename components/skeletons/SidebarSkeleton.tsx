
const SidebarSkeleton = () => {
  return (
    <div className="h-full px-3 py-4 overflow-y-auto flex flex-col animate-pulse">
      {/* Logo Skeleton */}
      <div className="mb-10 px-2 mt-2 hidden lg:block">
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="mb-10 px-2 mt-2 lg:hidden flex justify-between items-center">
        <div className="h-8 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Menu Items Skeleton */}
      <div className="space-y-4 flex-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center p-3">
            <div className="w-5 h-5 bg-gray-200 rounded mr-3"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* Bottom Items Skeleton */}
      <div className="pt-4 mt-4 space-y-4 border-t border-gray-200">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center p-3">
            <div className="w-5 h-5 bg-gray-200 rounded mr-3"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarSkeleton