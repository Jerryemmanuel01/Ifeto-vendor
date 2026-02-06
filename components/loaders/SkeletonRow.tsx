export default function SkeletonRow({ columns }: { columns: number }) {
  return (
    <div className="grid grid-cols-4 px-6 py-5 gap-4">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-full rounded-md bg-[#EAEAEA] animate-pulse"
        />
      ))}
    </div>
  );
}
