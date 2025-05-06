import '@/styles/globals.css';
import type { Metadata } from 'next';
import SocketInitializer from '@/components/SocketInitializer';

export const metadata: Metadata = {
  title: 'MindSync',
  description: 'Collective Consciousness Journal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* This stays server-side so it can export metadata */}
        <SocketInitializer />
        {children}
      </body>
    </html>
  );
}
