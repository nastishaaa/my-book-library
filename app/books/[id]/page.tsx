'use client';

import { useParams } from "next/navigation";
import BookDetail from "./_ui/BookPage";

export default function BookDetailsPage() {
    const param = useParams();
    const bookId = param?.id as string;

    return (
        <>
            <BookDetail bookId={bookId }/>
        </>
        
    )
}