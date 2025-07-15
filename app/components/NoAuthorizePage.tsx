'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function NoAuthorizePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex flex-col items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-red-700 mb-2">🚫 Access Denied</h1>
                <p className="text-gray-700 text-lg">Please log in to continue.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-center max-w-xl"
            >
                <p className="text-xl text-gray-800">
                    Create your personal library, track your favourites, and discover books you’ll love.
                </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/login">
                    <button className="px-6 py-3 bg-orange-600 text-white text-lg rounded-xl shadow hover:bg-orange-700 transition">
                        Login Now
                    </button>
                </Link>
                <Link href="/books">
                    <button className="px-6 py-3 bg-amber-500 text-white text-lg rounded-xl shadow hover:bg-amber-600 transition">
                        Explore Books
                    </button>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full max-w-5xl px-4"
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
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-amber-200">
            <h3 className="text-3xl mb-2">{icon}</h3>
            <h4 className="text-xl font-semibold text-amber-800 mb-2">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
