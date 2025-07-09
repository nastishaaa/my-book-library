import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Not Found 404 | mBL",
};

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
            <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! We couldn’t find this page.</h2>
            <p className="text-lg text-gray-600 mb-6 text-center">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
                ⬅ Go back home
            </Link>
        </div>
    );
}
