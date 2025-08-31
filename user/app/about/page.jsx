import AboutPageClient from "./AboutPageClient"

export const metadata = {
  title: "About COMSATS PLUS - Our Story & Team | COMSATS University App",
  description:
    "Learn about COMSATS PLUS, the student-built solution for COMSATS University Lahore. Meet our team and discover our mission to make university life easier.",
  keywords: "COMSATS PLUS Team, About, COMSATS University, Student Developers, University App Story",
  openGraph: {
    title: "About COMSATS PLUS - Our Story & Team",
    description: "Learn about COMSATS PLUS and meet the student team behind the ultimate COMSATS University companion app.",
    url: "https://cuiplus.com/about",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
