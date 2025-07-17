import { Suspense } from 'react';

import FavBookList from './components/FavBookList';
import ProtectedRoute from '@/components/PrivateRoute';
import LoadingSpinnerPage from '../loading';

export default function FavBooksPage() {
    return (
        <div>
            <h1 className=' mt-2.5 text-center font-bold text-4xl text-shadow-amber-950'>My Library</h1>
            <ProtectedRoute>
                <Suspense fallback={<LoadingSpinnerPage />}>
                    <FavBookList />
                </Suspense>
            </ProtectedRoute>
            
        </div>
    )
}