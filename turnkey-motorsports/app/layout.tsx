import type { Metadata } from 'next';
import { Oswald, Barlow } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shop/CartDrawer';
import GarageDrawer from '@/components/garage/GarageDrawer';
import ChatWidget from '@/components/chat/ChatWidget';
import VehicleSaveToast from '@/components/prompts/VehicleSaveToast';
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from '@/lib/cart-context';
import { GarageProvider } from '@/lib/garage-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { ChatProvider } from '@/lib/chat-context';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

const squareSdkUrl =
  process.env.NEXT_PUBLIC_SQUARE_APP_ID?.startsWith('sandbox-')
    ? 'https://sandbox.web.squarecdn.com/v1/square.js'
    : 'https://web.squarecdn.com/v1/square.js';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Performance Engine Builds & Parts`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${barlow.variable}`}>
      <body className="min-h-screen bg-background font-body text-white antialiased">
        <AuthProvider>
        <CartProvider>
          <GarageProvider>
          <WishlistProvider>
          <ChatProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <AnnouncementBar />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <CartDrawer />
            <GarageDrawer />
            <ChatWidget />
            <VehicleSaveToast />
          </ChatProvider>
          </WishlistProvider>
          </GarageProvider>
        </CartProvider>
        </AuthProvider>
        <Script src={squareSdkUrl} strategy="lazyOnload" />
      </body>
    </html>
  );
}
