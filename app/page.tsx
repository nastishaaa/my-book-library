'use client'

import ProtectedRoute from '../components/PrivateRoute'
import HomePage from './ui/HomePage';

export default function Home() {
    return (
        <div className="p-6">
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        </div>
    );
}
