'use client';

import { Book } from '@/app/books/ui/BooksList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface BookDetailProps {
  bookId: string;
}

export default function BookDetail({ bookId }: BookDetailProps) {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const findBook = async () => {
            try {
                const response = await axios.get(`/api/book/${bookId}`);
                setBook(response.data);
            } catch (error) {
                toast.error('Book not found!', { duration: 4000 });
            } finally {
                setLoading(false);
            }
        };

        findBook();
    }, [bookId]);

    if (loading) {
        return <div className="text-center text-[#a67c52] mt-10">Loading book...</div>;
    }

    if (!book) {
        return <div className="text-center text-[#a67c52] mt-10">Book not found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-[#f7f1e8] rounded-2xl shadow-lg border border-[#e4d6c3] mt-10">
            {book.isFavourite && (
                <span className="inline-block bg-[#d4b49d] text-white px-3 py-1 rounded-full text-sm mb-3">
                    🤎 Favourite
                </span>
            )}

            <h1 className="text-3xl font-bold text-[#5a3e36] mb-3">{book.title}</h1>

            <p className="text-[#7a5e4f] text-lg mb-1">
                <strong>Author:</strong> {book.author}
            </p>

            <p className="text-[#7a5e4f] text-lg mb-1">
                <strong>Genre:</strong> {book.genre}
            </p>

            <p className="text-[#5a3e36] mt-4 mb-6 whitespace-pre-line leading-relaxed">
                {book.description}
            </p>

            <div className="bg-[#f0e5d8] mt-6 p-4 rounded-lg shadow-sm border border-[#d8c8b6]">
                <h3 className="text-[#5a3e36] font-semibold text-lg mb-2">About the author</h3>
                <p className="text-[#6c4e3f] text-sm leading-relaxed">
                    We don’t have much info about <strong>{book.author}</strong> yet,
                    but stay tuned — author spotlights are coming soon!
                </p>
            </div>

            <button
                onClick={() => window.history.back()}
                className="mt-8 inline-block text-[#5a3e36] hover:text-[#3e2c25] transition underline"
            >
                ← Back to book list
            </button>
        </div>
    );
}
