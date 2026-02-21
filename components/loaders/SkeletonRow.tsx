export default function SkeletonRow({ columns }: { columns: number }) {
  return (
    <div
      className="grid px-6 py-5"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-full rounded-md bg-[#EAEAEA] animate-pulse"
        />
      ))}
    </div>
  );
}
