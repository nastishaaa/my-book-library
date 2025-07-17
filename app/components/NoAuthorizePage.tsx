'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function NoAuthorizePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f4f1e1] to-[#d9c6a7] flex flex-col items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-5xl font-extrabold text-[#6b4f3f] mb-4">
                    🚫 Access Denied
                </h1>
                <p className="text-[#5e4b3a] text-lg font-medium">Please log in to continue.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-center max-w-2xl"
            >
                <p className="text-xl text-[#4b3f33]">
                    Create your personal library, track your favourites, and discover books you’ll love.
                </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <Link href="/login">
                    <button className="px-8 py-4 bg-[#6b4f3f] text-white text-lg rounded-xl shadow-lg hover:bg-[#5e3b2e] transition duration-300">
                        Login Now
                    </button>
                </Link>
                <Link href="/books">
                    <button className="px-8 py-4 bg-[#b69d70] text-white text-lg rounded-xl shadow-lg hover:bg-[#a18458] transition duration-300">
                        Explore Books
                    </button>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 w-full max-w-5xl px-4"
            >
                <FeatureCard
                    icon="📚"
                    title="Organize"
                    description="Keep track of books you’ve read or want to read."
                />
                <FeatureCard
                    icon="⭐"
                    title="Favourite List"
                    description="Save and manage your top reads in one place."
                />
                <FeatureCard
                    icon="🔍"
                    title="Discover"
                    description="Browse books by genre, author, or title."
                />
            </motion.div>
        </main>
    );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="bg-[#f8f4e3] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-center border border-[#e0d2b8]">
            <h3 className="text-4xl mb-4">{icon}</h3>
            <h4 className="text-2xl font-semibold text-[#6b4f3f] mb-2">{title}</h4>
            <p className="text-[#4b3f33] text-lg">{description}</p>
        </div>
    );
}
