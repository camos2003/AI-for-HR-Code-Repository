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
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-900">
          <span className="font-semibold">Prototype</span> · Demo data only · Built for client review
        </div>
        <div className="flex min-h-[calc(100vh-34px)]">
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
