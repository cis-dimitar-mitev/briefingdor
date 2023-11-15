import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import styles from './page.module.css'

const inter = Inter({ subsets: ["latin"] });

export const maxDuration = 300;

export const metadata: Metadata = {
  title: "Briefingdor",
  description: "Cision Hackathon Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <header className={styles.staticHeader}>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
