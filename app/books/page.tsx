import { Metadata } from "next"
import BookHeader from "./ui/BookHeader"
import BooksList from "./ui/BooksList"
import ProtectedRoute from "@/components/PrivateRoute";
import AddNewBookBtn from "./ui/AddNewBookBtn";

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