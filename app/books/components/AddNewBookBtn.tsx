import Link from "next/link";

export default function AddNewBookBtn() {
    return (
        <div className="text-center mt-6 mb-4">
            <Link href="/add-book">
                <button className="bg-[#8b5e3c] hover:bg-[#7a4e31] text-white font-medium px-6 py-2 rounded-xl shadow-md transition-all duration-200 border border-[#d3c1ab]">
                    Add Book
                </button>
            </Link>
        </div>
    );
}
