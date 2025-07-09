import axios from "axios"
import { Book } from "@/app/books/ui/BooksList";

export const fetchBooks = async (accessToken: string): Promise<Book[]> => {
    try {
        const res = await axios.get<Book[]>('/api/book/getAllBooks',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
            }}
        );
        console.log('TOKEN --- '  + accessToken);
        
        return res.data;
    } catch (error: any) {
        console.log(error);
        return [];
        
    }

}