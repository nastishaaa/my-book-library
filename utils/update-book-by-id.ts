import axios from "axios";

export const updateBookById = async (
    id: string,
    token: string,
    bookData: Partial<{ isFavourite: boolean }>
) => {
    try {
        const res = await axios.patch(`/api/book/${id}`, bookData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error: any) {
        console.error("Failed to update book:", error.response?.data || error.message);
        throw error;
    }
}
