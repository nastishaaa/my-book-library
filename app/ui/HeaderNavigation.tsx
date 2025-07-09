'use client'

import Link from "next/link";
import { Book, Menu, X } from "@deemlol/next-icons";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function HeaderNavigation() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-[#F8F1EA] shadow-sm border-b border-[#D8C3A5]">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Логотип */}
                <Link href={'/'}>
                    <h1 className="text-2xl text-[#6F4E37] flex items-center gap-2 font-[var(--font-playfair)]">
                        <Book size={24} color="#6F4E37" /> BookApp
                    </h1>
                </Link>

                {/* Бургер кнопка */}
                <button
                    className="md:hidden text-[#6F4E37] focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Навігація + кнопки */}
                <div className="hidden md:flex md:items-center md:gap-6 text-[#5C4033] font-medium">
                    <Link href="/" className="hover:text-[#A47148] transition-colors">Home</Link>
                    <Link href="/books" className="hover:text-[#A47148] transition-colors">Books</Link>
                    <Link href="/favourite-books" className="hover:text-[#A47148] transition-colors">My Favourite List</Link>
                </div>

                <div className="hidden md:flex md:items-center md:gap-3">
                    <button
                        onClick={() => signIn('google')}
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#5C4033] bg-[#EFE2D3] border border-[#D8C3A5] hover:bg-[#e0cdb8] hover:shadow-md transition-all duration-300"
                    >
                        Вхід через Google
                    </button>

                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#5C4033] bg-[#EFE2D3] border border-[#D8C3A5] hover:bg-[#e0cdb8] hover:shadow-md transition-all duration-300"
                    >
                        Logout
                    </button>

                    <Link href={'/login'}>
                        <button
                            className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#5C4033] bg-[#EFE2D3] border border-[#D8C3A5] hover:bg-[#e0cdb8] hover:shadow-md transition-all duration-300"
                        >
                            Login Now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Мобільне меню */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 text-[#5C4033] font-medium">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-[#A47148]">Home</Link>
                    <Link href="/books" onClick={() => setMenuOpen(false)} className="block hover:text-[#A47148]">Books</Link>
                    <Link href="/favourite-books" onClick={() => setMenuOpen(false)} className="block hover:text-[#A47148]">My Favourite List</Link>
                    
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            signIn('google');
                        }}
                        className="w-full px-5 py-2.5 rounded-full text-sm font-semibold text-[#5C4033] bg-[#EFE2D3] border border-[#D8C3A5] hover:bg-[#e0cdb8] hover:shadow-md transition-all duration-300"
                    >
                        Вхід через Google
                    </button>

                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            signOut({ callbackUrl: '/' });
                        }}
                        className="w-full px-5 py-2.5 rounded-full text-sm font-semibold text-[#5C4033] bg-[#EFE2D3] border border-[#D8C3A5] hover:bg-[#e0cdb8] hover:shadow-md transition-all duration-300"
                    >
                        Logout
                    </button>

                    <Link href="/login" onClick={() => setMenuOpen(false)}>
                        <button
                            className="w-full px-5 py-2.5 rounded-full text-sm font-semibold text-[#5C4033] bg-[#EFE2D3] border border-[#D8C3A5] hover:bg-[#e0cdb8] hover:shadow-md transition-all duration-300"
                        >
                            Login Now
                        </button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
