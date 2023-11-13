import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextLink from "next/link";
import { Link } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <header>
          <h1>Briefingdor AI Proofreader</h1>
          <nav>
            <ul>
              <li>
                <Link component={NextLink} href="/">
                  Start
                </Link>
              </li>
              <li>
                <Link component={NextLink} href="/history">
                  History
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
