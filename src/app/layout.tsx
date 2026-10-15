import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MotionProvider } from "@/components/ui/motion-provider";
import { siteConfig } from "@/data/site-config";
import { getSiteUrl, hasConfiguredSiteUrl } from "@/lib/utils";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${siteConfig.name} — Software Engineer & Flutter Developer`;
const description = `Explore the software engineering portfolio of ${siteConfig.name}, an Information Technology ${siteConfig.education.status === "graduate" ? "graduate" : "student"} focused on backend development, Flutter, and practical digital solutions.`;

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    siteConfig.name,
    "Software Engineer",
    "Backend Developer",
    "Flutter Developer",
    "PHP",
    "Laravel",
    "Politeknik Negeri Padang",
    "Portfolio",
  ],
  alternates: hasConfiguredSiteUrl() ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#101310",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-lime px-4 py-2 font-mono text-sm text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <div aria-hidden="true" className="bg-grid pointer-events-none fixed inset-x-0 top-0 -z-10 h-[110vh]" />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-[-18rem] left-1/2 -z-10 h-[32rem] w-[min(60rem,140vw)] -translate-x-1/2 rounded-full bg-lime/[0.07] blur-[120px]"
        />
        <MotionProvider>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
