import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"



export const metadata = {
  title: "COMSATS PLUS - Your Ultimate COMSATS University Companion",
  description:
    "Find empty rooms, calculate GPA, and create campus memories at COMSATS University Lahore. The all-in-one solution for students by students.",
  keywords: "COMSATS, University, Lahore, Room Finder, GPA Calculator, Student App, Campus, COMSATS PLUS",
  authors: [{ name: "COMSATS PLUS Team" }],
  creator: "COMSATS PLUS Team",
  publisher: "COMSATS PLUS",
  robots: "index, follow",
  openGraph: {
    title: "COMSATS PLUS - Your Ultimate COMSATS University Companion",
    description: "Find empty rooms, calculate GPA, and create campus memories at COMSATS University Lahore.",
    url: "https://cuiplus.com",
    siteName: "COMSATS PLUS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "COMSATS PLUS - Your Ultimate COMSATS University Companion",
    description: "Find empty rooms, calculate GPA, and create campus memories at COMSATS University Lahore.",
    creator: "@cuiplus",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1E1F4A",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
