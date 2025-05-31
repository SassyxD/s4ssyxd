import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "S4ssyxD Portfolio",
  description: "Personal portfolio showcasing creative work and experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script id="theme-script" strategy="beforeInteractive">
        {`
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        `}
      </Script>
      <body className={`${poppins.variable} font-sans bg-background-light dark:bg-background-dark`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
