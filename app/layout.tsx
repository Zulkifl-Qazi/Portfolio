import type { Metadata } from 'next';
import './globals.css';
import CursorWrapper from '@/components/ui/CursorWrapper';

export const metadata: Metadata = {
  title: 'Zulkifl Qazi',
  description:
    'Portfolio of Zulkifl Qazi — Founder and Lead Security Engineer at Team Zero-Gap. Expert in SOC operations, SIEM engineering, compliance automation, DFIR, and threat detection.',
  keywords: ['Zulkifl Qazi', 'Team Zero-Gap', 'Cybersecurity', 'SOC', 'SIEM', 'Compliance Automation'],
  authors: [{ name: 'Zulkifl Qazi' }],
  openGraph: {
    title: 'Zulkifl Qazi — Cybersecurity Engineer | Team Zero-Gap',
    description: 'World-class cybersecurity engineering portfolio',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* CursorWrapper is a Client Component — renders GlobalCursor as body-level child */}
        <CursorWrapper />
        {children}
      </body>
    </html>
  );
}
