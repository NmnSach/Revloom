import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0813" },
  ],
};

export const metadata = {
  title: "Revloom — Supercharge Your LinkedIn Reach & Content",
  description:
    "Revloom helps founders, creators, and leaders scale their LinkedIn reach and craft high-performing content.",
  icons: {
    icon: [
      { url: "/favicon.jpeg", type: "image/jpeg" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/favicon.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/favicon.jpeg" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,600,700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
