import { Metadata } from "next";
import BookHeader from "./components/BookHeader";
import BooksList from "./components/BooksList";
import ProtectedRoute from "@/components/PrivateRoute";
import AddNewBookBtn from "./components/AddNewBookBtn";

export const metadata: Metadata = {
    title: "Books | mBL",
};

export default function BooksPage() {
    return (
        <div>
            <ProtectedRoute>
                <BookHeader />
                <AddNewBookBtn />
                <BooksList />
            </ProtectedRoute>
        </div>
    );
}