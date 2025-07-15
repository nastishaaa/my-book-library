import { create } from 'zustand';
import axios from 'axios';
import { Book } from '../books/components/BooksList';
import { updateBookById } from '@/utils/update-book-by-id';

type BooksStore = {
    books: Book[];
    favouriteBooks: Book[];

    fetchBooks: (accessToken: string) => Promise<void>;
    addToFavourite: (id: string, accessToken: string) => Promise<void>;
};

export const useBooksStore = create<BooksStore>((set, get) => ({
    books: [],
    favouriteBooks: [],

    fetchBooks: async (accessToken: string) => {
        try {
            const res = await axios.get<Book[]>('/api/book/getAllBooks', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            set({
                books: res.data,
                favouriteBooks: res.data.filter(book => book.isFavourite)
            });
        } catch (error: any) {
            console.log('Fetch books error:', error);
        }
    },

    addToFavourite: async (id: string, accessToken: string) => {
        const { books, favouriteBooks } = get();

        const bookToUpdate = books.find(book => book._id === id);
    if (!bookToUpdate || !accessToken) return;

    const isFavouriteNow = !bookToUpdate.isFavourite;

    const updatedBooks = books.map(book =>
        book._id === id ? { ...book, isFavourite: isFavouriteNow } : book
    );

    const updatedFavourites = isFavouriteNow
        ? [...favouriteBooks, { ...bookToUpdate, isFavourite: true }]
        : favouriteBooks.filter(book => book._id !== id);

    set({
        books: updatedBooks,
        favouriteBooks: updatedFavourites,
    });

    try {
        await updateBookById(id, accessToken, { isFavourite: isFavouriteNow });
    } catch (error) {
        console.error("Server update failed, optionally rollback local state here");
    }
    },
}));
