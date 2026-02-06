// loaders/SkeletonHeader.tsx
export default function SkeletonHeader({ columns }: { columns: number }) {
  return (
    <div
      className="grid bg-[#EFEEEE] px-6 py-3 rounded-t-lg"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
      ))}
    </div>
  );
}
