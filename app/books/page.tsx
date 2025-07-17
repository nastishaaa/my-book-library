import { Metadata } from "next";
import { Suspense } from "react";

import BookHeader from "./components/BookHeader";
import BooksList from "./components/BooksList";
import ProtectedRoute from "@/components/PrivateRoute";
import AddNewBookBtn from "./components/AddNewBookBtn";
import LoadingSpinnerPage from "../loading";

export const metadata: Metadata = {
    title: "Books | mBL",
};

export default function BooksPage() {
    return (
        <div>
            <ProtectedRoute>
                <BookHeader />
                <AddNewBookBtn />
                <Suspense fallback={<LoadingSpinnerPage />}> 
                    <BooksList />
                </Suspense>
            </ProtectedRoute>
        </div>
    );
}