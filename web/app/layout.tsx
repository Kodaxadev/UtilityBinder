import type { Metadata } from "next";
import { Barlow, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "UtilityBinder — Know what to shut off when Dave isn't there",
  description:
    "UtilityBinder turns your park's old maps, staff memory, photos, and repair notes " +
    "into a private emergency reference for shutoffs, breakers, cleanouts, valves, " +
    "meters, pumps, and utility trouble spots. Not a utility locate — call 811 before digging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-caution focus:px-4 focus:py-2 focus:font-bold focus:text-asphalt"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
