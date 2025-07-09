import FavBookList from './_ui/FavBookList';
import ProtectedRoute from '@/components/PrivateRoute';

export default function FavBooksPage() {
    return (
        <div>
            <h1 className=' mt-2.5 text-center font-bold text-4xl text-shadow-amber-950'>My Library</h1>
            <ProtectedRoute>
                <FavBookList />
            </ProtectedRoute>
            
        </div>
    )
}