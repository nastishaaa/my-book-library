import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import HeaderNavigation from "./ui/HeaderNavigation";
import SessionWrapper from "./SessionWrapper"; // 👈 нове

const playfairFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "MyBookLibrary | mBL",
  description: "App for book lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairFont.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionWrapper>
          <HeaderNavigation />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
