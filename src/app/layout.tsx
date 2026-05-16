import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iSpani — Instant Job Matching for South Africa",
  description:
    "South Africa's trusted instant-job matching engine. Fill skills gaps in minutes or build your career on verified performance — no CVs needed.",
  keywords: ["jobs", "gigs", "South Africa", "skills", "instant hiring", "ispani"],
  openGraph: {
    title: "iSpani",
    description: "Instant jobs. Real skills. No CVs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
