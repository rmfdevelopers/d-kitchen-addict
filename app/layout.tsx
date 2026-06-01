import { Oswald, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Oswald({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700'] 
});

const body = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['400', '500', '700']
});

export const metadata = {
  title: 'D Kitchen Addict | Luxury Catering in Nigeria',
  description: 'Award-nominated catering powerhouse delivering premium culinary experiences across Osun, Ibadan, and Ondo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}