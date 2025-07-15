'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import BookItem from "./BookItem";
import FindBookInput from "./FindBookInput";

import { useBooksStore } from "@/app/store/book-state";
import { useSession } from "next-auth/react";
import { filterBooks } from "@/utils/filter";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isFavourite?: boolean;
  description: string;
}

export default function BooksList() {
  const [search, setSearch] = useState("");
  const { books, fetchBooks } = useBooksStore();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const findBooks = async () => {
      if (!session?.accessToken) return;
      try {
        await fetchBooks(session.accessToken);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    findBooks();
  }, [session]);

  const handleRoute = (book: Book) => {
    router.push(`/books/${book._id}`);
  };

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const displayedBooks =
    search.trim() === "" ? books : filterBooks(books, search);

  return (
    <>
      <FindBookInput handleOnChange={handleChange} />
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
        {displayedBooks.length === 0 ? (
          <div className="mt-8 text-center text-[#a67c52] text-lg">No results found...</div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayedBooks.map((book) => (
              <li
                onClick={() => handleRoute(book)}
                key={book._id}
                className="bg-[#fffaf5] border border-[#e0d6ca] rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                <BookItem book={book} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
