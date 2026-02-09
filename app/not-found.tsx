import Link from "next/link";
import Image from "next/image";
import EmptyStateSvg from "@/assets/svgs/empty-state.svg"; // Re-using existing empty state for missing page, or find something better?

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center">
        <div className="mb-6 bg-gray-50 p-6 rounded-full">
          <Image
            src={EmptyStateSvg}
            alt="Page not found"
            className="w-20 h-20 text-gray-400"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/dashboard"
          className="w-full bg-[#27AE60] hover:bg-[#219150] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
