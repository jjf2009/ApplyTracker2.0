"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  // {
  //   q: "How does the browser extension work?",
  //   a: "Our browser extension automatically detects job application submission buttons on major platforms like LinkedIn, Indeed, and Greenhouse. When you click 'Submit', it captures the company name, role, and URL, saving them to your eztrackr dashboard instantly."
  // },
  {
    q: "Is my application data secure?",
    a: "Absolutely. We use industry-standard encryption (AES-256) to secure your data at rest and TLS for data in transit. We never sell your personal information or application history to third parties."
  },
  {
    q: "Can I import data from my existing spreadsheet?",
    a: "Yes! trackerezz supports CSV and Excel imports. You can map your existing columns to our fields in minutes and pick up right where you left off."
  },
  // {
  //   q: "How does the AI Interview Prep feature work?",
  //   a: "The AI analyzes the job description you've saved and compares it against thousands of successful interview transcripts for similar roles. It generates the top 5 questions you're likely to face and provides feedback on how to structure your answers."
  // },
  {
    q: "Is there a mobile app?",
    a: "While we don't have a native app yet, eztrackr is a Progressive Web App (PWA). You can 'Add to Home Screen' on iOS or Android for a full-screen, native-like experience on the go."
  }
];

export function FAQ() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
            Common questions answered.
          </p>
        </div>

        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
