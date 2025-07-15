'use client';

export default function GlobalErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body className="bg-[#f6f1ec] flex items-center justify-center min-h-screen">
                <div className="bg-[#fffaf5] border border-[#e0d6ca] rounded-2xl shadow-md px-10 py-8 max-w-lg text-center">
                    <h2 className="text-2xl font-semibold text-[#a67c52] mb-4">
                        Something went wrong...
                    </h2>
                    <p className="text-[#5c4630] text-sm mb-6">
                        We are already working on it. Please try again.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="bg-[#a67c52] text-white px-6 py-2 rounded-lg hover:bg-[#8a6543] transition"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
