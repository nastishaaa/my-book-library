import { Book } from "./BooksList";
import { useBooksStore } from "@/app/store/book-state";
import { useSession } from "next-auth/react";

interface Props {
    book: Book,
}

export default function BookItem({ book }: Props) {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    const { addToFavourite } = useBooksStore();

    if (!accessToken) return;
    
    return (
        <div className="bg-[#fffaf3] border border-[#e0d2c0] shadow-md rounded-2xl p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#4b2e22] mb-1">{book.title}</h2><button
                onClick={(e) =>{
                    e.stopPropagation(); 
                    addToFavourite(book._id, accessToken);
                }}
                
                className="float-right text-lg"
                title={book.isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
                {book.isFavourite ? "❤️" : "🤍"}
            </button>
            <p className="text-sm text-[#e98f4a] italic mb-2">by {book.author}</p>
            <span className="inline-block bg-[#e8d8c3] text-[#5e3d2b] text-xs px-2 py-1 rounded-full mb-3">
                {book.genre}
            </span>
            <p className="text-sm text-[#3f2a20]">{book.description}</p>
        </div>
    );
}
