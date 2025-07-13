'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import BookItem from '../../books/ui/BookItem';
import type { Book } from '@/app/books/ui/BooksList';
import { fetchBooks } from '@/utils/fetch-books';
import { updateBookById } from '@/utils/update-book-by-id';

export default function FavBookList() {
    const { data: session } = useSession();
    const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);

    const handleClick = async (clickedBook: Book) => {
        if (!session?.accessToken) return;
    
        try {
            await updateBookById(clickedBook._id, session.accessToken, {
                isFavourite: false
            });
            setFavouriteBooks(prev =>
                prev.filter(book => book._id !== clickedBook._id)
            );
        } catch (error) {
            console.error("Failed to update book", error);
        }
    };
    
    useEffect(() => {
        const findBooks = async () => {
            if (!session?.accessToken) return;

            const foundBooks = await fetchBooks(session.accessToken);
            if (!foundBooks) return;
            const filtered = foundBooks.filter((book: Book) => book.isFavourite === true);
            setFavouriteBooks(filtered);
        };
        findBooks();
    }, [session]);

    return (
        <>
            {favouriteBooks.length === 0 ? (
                <div className="text-center p-6">
                    <h3 className="text-xl font-semibold mb-2">You haven't added any favourites yet</h3>
                    <p className="text-gray-600 mb-4">
                        Start exploring the library and click the ❤️ icon to save books you love.
                    </p>
                    <button
                        onClick={() => window.location.href = '/books'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Browse Books
                    </button>
                </div>
            ) : (

                <div>
                    <ul>
                        {favouriteBooks.map(book => (
                            <li key={book._id}>
                                <BookItem book={book} onClick={handleClick} />
                            </li>
                        ))}
                    </ul>
            
                </div>)}
        </>
    )
}