'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f1e3d8] to-[#e5d1b4] text-[#5c4033] px-6 py-10">
            <div className="max-w-4xl mx-auto">
                
                <section className="mb-10">
                    <h1 className="text-5xl font-extrabold font-[var(--font-playfair)] mb-4 text-[#4e3820]">
                        Welcome, {user?.name?.split(' ')[0] || 'Reader'} 👋
                    </h1>
                    <p className="text-lg text-[#7a5c44]">Step into your personal book haven.</p>
                </section>

                <section className="mb-12 grid gap-8 md:grid-cols-2">
                    <Link href="/books">
                        <div className="rounded-2xl p-8 bg-[#f9f3e7] hover:bg-[#e8dbbe] shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-semibold mb-2 text-[#4e3820]">📚 Browse Books</h2>
                            <p className="text-[#6b4f3f]">Discover new stories and save your favorites to your library.</p>
                        </div>
                    </Link>

                    <Link href="/favourite-books">
                        <div className="rounded-2xl p-8 bg-[#f9f3e7] hover:bg-[#e8dbbe] shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-semibold mb-2 text-[#4e3820]">❤️ Favorite Books</h2>
                            <p className="text-[#6b4f3f]">Quick access to the books that touched your heart the most.</p>
                        </div>
                    </Link>
                </section>

                <section className="mb-14 text-center bg-[#f3e1cc] py-8 px-6 rounded-xl shadow-md border border-[#d1b299]">
                    <p className="italic text-lg font-medium text-[#6f4e37]">
                        “A reader lives a thousand lives before he dies. The man who never reads lives only one.”
                    </p>
                    <p className="mt-2 text-sm text-[#8c6b5c]">— George R.R. Martin</p>
                </section>

                <section className="bg-[#f9f3e7] border border-[#d1b299] rounded-xl p-8 shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4 text-[#4e3820]">👤 Your Profile</h3>
                    <div className="space-y-4 text-[#4e3820]">
                        <p><span className="font-medium">Name:</span> {user?.name}</p>
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        {user?.image && (
                            <img
                                src={user.image}
                                alt="User Avatar"
                                className="w-20 h-20 rounded-full border-4 border-[#d1b299] mt-4"
                            />
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
