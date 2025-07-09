'use client'

import Link from "next/link"

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 px-6 py-12 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-amber-800 mb-4">
                Welcome to <span className="text-orange-600">My Book List</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8">
                Create your personal library, track your favourites, and discover books you'll love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/login">
                    <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                        Login
                    </button>
                </Link>
                <Link href="/books">
                    <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
                        View Books
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mt-8">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">📚 Organize</h3>
                    <p className="text-gray-600">Keep track of books you’ve read or want to read.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">⭐ Favourite List</h3>
                    <p className="text-gray-600">Save and manage your top reads in one place.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">🔍 Discover</h3>
                    <p className="text-gray-600">Browse books by genre, author, or title.</p>
                </div>
            </div>
        </div>
    )
}