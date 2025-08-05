import './globals.css';
import { Toaster } from 'sonner';
import Provider from './_trpc/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
