import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NIRF Peek - College Rankings & Analytics",
  description: "Explore Indian college rankings, trends, and comprehensive analytics based on NIRF data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-foreground">NIRF Peek</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/explore" 
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}