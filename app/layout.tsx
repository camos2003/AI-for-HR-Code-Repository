import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Headcount Approval Portal",
  description: "Route manager headcount requests through leadership approval.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Nav />
          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-6xl px-6 py-10 animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
