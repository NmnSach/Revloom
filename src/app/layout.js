import "./globals.css";

export const metadata = {
  title: "Revloom — Supercharge Your LinkedIn Reach & Content",
  description:
    "Revloom helps founders, creators, and leaders scale their LinkedIn reach and craft high-performing content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,600,700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
