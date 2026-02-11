export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
        <div className="h-8 bg-gray-300 rounded mb-4 w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}
