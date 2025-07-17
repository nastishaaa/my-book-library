import { Suspense } from "react";

import BookDetail from "./components/BookPage";
import LoadingSpinnerPage from "@/app/loading";

export default function BookDetailsPage() {
    return (
        <>
            <Suspense fallback={<LoadingSpinnerPage />}>
                <BookDetail />
            </Suspense>
        </>
        
    )
}