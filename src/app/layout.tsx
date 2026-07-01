import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepak Joshi — Frontend Developer & UI/UX Designer",
  description:
    "Melbourne-based frontend developer building production interfaces with React, Next.js, and Tailwind. Available for new opportunities.",
  authors: [{ name: "Deepak Joshi" }],
  openGraph: {
    title: "Deepak Joshi — Frontend Developer",
    description:
      "Melbourne-based frontend developer. React, Next.js, Tailwind.",
    url: "https://deepakjoshi.dev",
    siteName: "Deepak Joshi",
    locale: "en_AU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
