'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <main className="min-h-screen bg-[#F8F1EA] text-[#5C4033] px-6 py-10">
            <div className="max-w-4xl mx-auto">
                
                <section className="mb-10">
                    <h1 className="text-4xl font-bold font-[var(--font-playfair)] mb-2">
                        Welcome, {user?.name?.split(' ')[0] || 'Reader'} 👋
                    </h1>
                    <p className="text-lg text-[#7A5C44]">Step into your personal book haven.</p>
                </section>

                <section className="mb-12 grid gap-6 md:grid-cols-2">
                    <Link href="/books">
                        <div className="rounded-2xl p-6 bg-[#EFE2D3] hover:bg-[#e0cdb8] shadow transition-all duration-300">
                            <h2 className="text-xl font-semibold mb-2">📚 Browse Books</h2>
                            <p>Discover new stories and save your favorites to your library.</p>
                        </div>
                    </Link>

                    <Link href="/favourite-books">
                        <div className="rounded-2xl p-6 bg-[#EFE2D3] hover:bg-[#e0cdb8] shadow transition-all duration-300">
                            <h2 className="text-xl font-semibold mb-2">❤️ Favorite Books</h2>
                            <p>Quick access to the books that touched your heart the most.</p>
                        </div>
                    </Link>
                </section>

                <section className="mb-14 text-center bg-[#F4E3D2] py-6 px-4 rounded-xl shadow-sm border border-[#D8C3A5]">
                    <p className="italic text-lg font-medium text-[#6F4E37]">
                        “A reader lives a thousand lives before he dies. The man who never reads lives only one.” 
                    </p>
                    <p className="mt-2 text-sm text-[#8C6B5C]">— George R.R. Martin</p>
                </section>

                <section className="bg-[#EFE2D3] border border-[#D8C3A5] rounded-xl p-6 shadow-sm">
                    <h3 className="text-2xl font-semibold mb-4">👤 Your Profile</h3>
                    <div className="space-y-2">
                        <p><span className="font-medium">Name:</span> {user?.name}</p>
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        {user?.image && (
                            <img
                                src={user.image}
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full border border-[#D8C3A5] mt-4"
                            />
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
