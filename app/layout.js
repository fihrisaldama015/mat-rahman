import { Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simulasi Matematika",
  description: "App By Muhammad Rahman Prihadi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-svh`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
