import ContactPageClient from "./ContactPageClient"

export const metadata = {
  title: "Contact COMSATS PLUS - Get Help & Support | COMSATS University",
  description:
    "Contact the COMSATS PLUS team for support, feedback, or feature requests. We're here to help COMSATS University Lahore students succeed.",
  keywords: "COMSATS PLUS Contact, Support, Help, Feedback, COMSATS University, Student Support",
  openGraph: {
    title: "Contact COMSATS PLUS - Get Help & Support",
    description:
      "Get in touch with the COMSATS PLUS team for support, feedback, or any questions about our COMSATS University app.",
    url: "https://cuiplus.com/contact",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
