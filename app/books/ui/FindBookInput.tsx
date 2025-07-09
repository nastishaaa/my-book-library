import { Book } from "./BooksList";

interface Props {
  handleOnChange: (value: string) => void;
}

export default function FindBookInput({ handleOnChange }: Props) {
    return (
        <div className="w-full flex justify-center px-4 mb-10">
            <div className="w-full max-w-xl bg-[#fff8f0] p-6 rounded-2xl shadow-sm border border-[#e6d9c8]">
                <h4 className="text-xl sm:text-2xl font-semibold text-[#5c4033] mb-4 tracking-wide">
                    Find Book
                </h4>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Book name"
                    onChange={(e) => handleOnChange(e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border border-[#d3c1ab] bg-[#fffaf5] text-[#5c4033] placeholder-[#a58c75] focus:outline-none focus:ring-2 focus:ring-[#c0a98f] focus:border-[#c0a98f] transition-all duration-300 shadow-sm text-sm sm:text-base"
                />
            </div>
        </div>
    );
}
