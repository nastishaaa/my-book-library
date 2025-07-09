import { Book } from "@/app/books/ui/BooksList";

export function filterBooks(books: Book[], query: string): Book[] {
    const lower = query.toLowerCase();
    return books.filter(
        (book) =>
            book.title.toLowerCase().includes(lower) ||
            book.author.toLowerCase().includes(lower) ||
            book.genre.toLowerCase().includes(lower)
    );
}
