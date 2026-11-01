import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AlgoPlay | Animated LeetCode Solutions',
  description: 'Interactive step-by-step algorithmic visualizations for the LeetCode Top Interview 150',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink antialiased flex flex-col min-h-screen">
        <Navbar />

        {/* Main page body */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
