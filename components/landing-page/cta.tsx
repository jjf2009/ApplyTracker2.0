import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-purple-600 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/50 to-indigo-900/50 pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl leading-tight">
          Ready to take control of your career search?
        </h2>
        <p className="mt-6 text-xl text-purple-100 opacity-90 leading-relaxed">
          Join thousands of professionals using eztrackr to landing more interviews and getting hired faster.
        </p>
        
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 h-14 px-10 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
            Get started for free
          </Button>
          <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 h-14 px-10 rounded-full text-lg font-bold transition-all w-full sm:w-auto">
            Talk to an advisor
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-purple-200">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-2xl">98%</span>
            <span className="text-sm">User satisfaction</span>
          </div>
          <div className="w-px h-8 bg-purple-400 opacity-30" />
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-2xl">20k+</span>
            <span className="text-sm">Applications tracked</span>
          </div>
          <div className="w-px h-8 bg-purple-400 opacity-30" />
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-2xl">10min</span>
            <span className="text-sm">Setup time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
