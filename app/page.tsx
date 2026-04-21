import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/landing-page/hero";
import { Features } from "@/components/landing-page/features";
import { FAQ } from "@/components/landing-page/faq";
import { CTA } from "@/components/landing-page/cta";
import { Footer } from "@/components/landing-page/footer";

export const metadata = {
  title: "eztrackr | The Smartest Way to Track Job Applications",
  description: "Stop losing track of your job search. eztrackr helps you organize applications, prepare with AI, and land more interviews effortlessly.",
  openGraph: {
    title: "eztrackr | Track Job Applications Like a Pro",
    description: "The all-in-one command center for your job search.",
    images: ["/dashboard-preview.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
