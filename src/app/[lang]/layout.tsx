import type { Metadata } from 'next';
import { DM_Sans, Poppins } from 'next/font/google';
import '../globals.css';
import ReactQueryProvider from '@/components/layout/ReactQueryProvider';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: true,
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Solar Square',
  description: 'Your solar calculator PWA',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icon512_rounded.png' },
    { rel: 'apple-touch-icon', url: '/icon512_rounded.png' },
  ],
};
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${dmSans.variable} ${poppins.variable} overflow-hidden`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
