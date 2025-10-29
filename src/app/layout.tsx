import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import { OnchainKitProvider } from "./components/OnchainKitProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PetPortrait Pro - Transform Your Pet Photos Into Art",
  description: "Turn your pet photos into artistic masterpieces with AI-powered portrait generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${montserrat.variable} antialiased flex flex-col min-h-screen`}
      >
        <OnchainKitProvider>
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </OnchainKitProvider>
      </body>
    </html>
  );
}
