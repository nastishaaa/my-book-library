'use client'

import { useRouter } from 'next/navigation';
import BookItem from '../../books/components/BookItem';
import { Book } from '@/app/books/components/BooksList';
import { useBooksStore } from '@/app/store/book-state';

export default function FavBookList() {
    const { books } = useBooksStore();
    const favouriteBooks = books.filter(book => book.isFavourite === true);
    const router = useRouter();

    const handleRoute = (book: Book) => {
        router.push(`/books/${book._id}`);
    };

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

                <div className='m-5'>
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {favouriteBooks.map((book) => (
                            <li
                                onClick={() => handleRoute(book)}
                                key={book._id}
                                className="bg-[#fffaf5] border border-[#e0d6ca] rounded-2xl shadow-md hover:shadow-lg transition p-6"
                            >
                                <BookItem book={book} />
                            </li>
                        ))}
                    </ul>
                </div>)}
        </>
    )
}