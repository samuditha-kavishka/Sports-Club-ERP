import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarWrapper } from "@/components/SidebarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZOOKIE Sports Club",
  description: "Enterprise Resource Planning for Sports Clubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen selection:bg-[#007AFF]/20 selection:text-slate-900`}>
        <div className="flex h-screen overflow-hidden">
          <SidebarWrapper>
            {children}
          </SidebarWrapper>
        </div>
      </body>
    </html>
  );
}
