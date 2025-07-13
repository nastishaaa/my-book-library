'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import BookItem from "./BookItem";
import FindBookInput from "./FindBookInput";

import { fetchBooks } from "@/utils/fetch-books";
import { useSession } from "next-auth/react";
import { filterBooks } from "@/utils/filter";
import { updateBookById } from "@/utils/update-book-by-id";

export interface Book {
  _id: string,
  title: string,
  author: string,
  genre: string,
  isFavourite?: boolean,
  description: string,
};

export default function BookList() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();

  const handleRoute = (book: Book) => {
    router.push(`/books/${book._id}`);
  }
  const handleChange = (value: string) => {
    if (value.trim() === '') {
      setBooks(allBooks);
    } else {
      const res = filterBooks(allBooks, value);
      setBooks(res);
    }
  };

  const handleClick = async (clickedBook: Book) => {
    try {
      if (!session?.accessToken) return;

      const updated = !clickedBook.isFavourite;
      await updateBookById(clickedBook._id, session.accessToken, { isFavourite: updated })

      setBooks(prevBooks =>
        prevBooks.map(book =>
          book._id === clickedBook._id
            ? { ...book, isFavourite: updated }
            : book
        )
      );
      setAllBooks(prevBooks =>
        prevBooks.map(book =>
          book._id === clickedBook._id
            ? { ...book, isFavourite: updated }
            : book
        )
      );

    } catch (error) {
      console.log(error);
      
    }

  }

  const { data: session } = useSession();
  
  useEffect(() => {
    const findBooks = async () => {
      if (!session?.accessToken) return;
      try {
        const res = await fetchBooks(session.accessToken);
        setAllBooks(res);
        setBooks(res);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
  
    findBooks();
  }, [session]);

  return (
    <>
      <FindBookInput handleOnChange={handleChange} />
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
        {books.length === 0 ? (
          <div className="mt-8 text-center text-[#a67c52] text-lg">No results found...</div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li
                onClick={() => {handleRoute(book)}}
                key={book._id}
                className="bg-[#fffaf5] border border-[#e0d6ca] rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                <BookItem book={book} onClick={handleClick} />
              </li>
            ))}
          </ul>
        )}
      </div>

      
    </>
  );
}
