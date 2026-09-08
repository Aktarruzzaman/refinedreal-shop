import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: {
    default: "RefinedReal — Refined essentials for everyday life",
    template: "%s | RefinedReal",
  },
  description:
    "RefinedReal is a small, independent shop for refined everyday essentials — audio, desk setup, and lifestyle gadgets chosen with care.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"),
  openGraph: {
    title: "RefinedReal — Refined essentials for everyday life",
    description:
      "A small, independent shop for refined everyday essentials — audio, desk setup, and lifestyle gadgets chosen with care.",
    siteName: "RefinedReal",
    type: "website",
  },
};

// Runs before paint so the stored theme applies with no flash of the wrong theme.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('refinedreal_theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans bg-paper text-ink antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
