'use client'

import Link from "next/link"

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5e6d1] to-[#e4d1a0] px-6 py-12 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#4f3a23] mb-6">
                Welcome to <span className="text-[#d29a53]">My Book Library</span>
            </h1>

            <p className="text-lg md:text-xl text-[#5c4a34] max-w-2xl mb-10">
                Build your own book haven, where you can organize your reads, manage favourites, and explore new stories to fall in love with.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Link href="/login">
                    <button className="px-8 py-3 bg-[#6a4f32] text-white text-lg rounded-xl shadow-md hover:bg-[#5c4329] transition-all duration-300">
                        Login to Your Library
                    </button>
                </Link>
                <Link href="/books">
                    <button className="px-8 py-3 bg-[#c69c6d] text-white text-lg rounded-xl shadow-md hover:bg-[#b58b60] transition-all duration-300">
                        Start Exploring
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mt-8 px-4">
                <div className="bg-[#f9f3e1] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-[#4f3a23] mb-3">📚 Organize Your Books</h3>
                    <p className="text-[#6b4f3f]">Create a personalized library to track your books, both read and unread.</p>
                </div>
                <div className="bg-[#f9f3e1] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-[#4f3a23] mb-3">⭐ Favourite List</h3>
                    <p className="text-[#6b4f3f]">Keep a curated list of books that you've cherished the most and revisit them whenever you want.</p>
                </div>
                <div className="bg-[#f9f3e1] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-[#4f3a23] mb-3">🔍 Discover New Reads</h3>
                    <p className="text-[#6b4f3f]">Browse through genres, authors, or titles to discover new stories and authors to explore.</p>
                </div>
            </div>

            <section className="mt-12 bg-[#e4d1a0] text-[#4f3a23] p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Why Reading is Magical</h2>
                <p className="text-lg font-light mb-6">Books are not just pages bound together; they are worlds waiting to be explored. Whether you read to escape, to learn, or to grow, each page brings you closer to a deeper understanding of the world and yourself. Start your journey today!</p>
                <Link href="/login">
                    <button className="px-8 py-3 bg-[#6a4f32] text-white text-lg rounded-xl shadow-md hover:bg-[#5c4329] transition-all duration-300">
                        Explore the Magic
                    </button>
                </Link>
            </section>
        </div>
    )
}
