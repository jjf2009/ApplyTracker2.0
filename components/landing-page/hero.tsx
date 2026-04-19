import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 text-center">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-100/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-violet-100/40 blur-3xl" />
      
      <div className="relative z-10 max-w-4xl pt-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
          Join 2,000+ job seekers this week
        </div>
        
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl">
          From Spreadsheet Chaos<br />
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            to Career Control.
          </span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 leading-relaxed">
          Stop digging through emails and 50+ open tabs. eztrackr is the all-in-one command center that bridges the gap between applying and landing the offer.
        </p>
        
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 h-12 px-8 rounded-full text-base font-semibold shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
            Start tracking for free
          </Button>
          <Button size="lg" variant="outline" className="h-12 border-gray-200 text-gray-600 rounded-full px-8 text-base font-medium hover:bg-gray-50 transition-all">
            See how it works →
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-400 font-medium">No credit card required · Free forever for individuals</p>
        
        {/* Hero image/mockup placeholder */}
        <div className="mt-16 relative w-full max-w-5xl mx-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
            <Image 
              src="/dashboard-preview.png" 
              alt="eztrackr dashboard showing job applications tracking" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
