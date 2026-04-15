import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#7C3AED] relative overflow-hidden font-sans">
      {/* Testimonial Section - Visible on LG screens */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-12 xl:px-24 text-white relative z-10">
        {/* Quote Icon */}
        <div className="mb-8">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-50"
          >
            <path
              d="M14 18C14 14.6863 16.6863 12 20 12V18H14ZM14 18H20V24C20 27.3137 17.3137 30 14 30H12V24H14V18ZM28 18C28 14.6863 30.6863 12 34 12V18H28ZM28 18H34V24C34 27.3137 31.3137 30 28 30H26V24H28V18Z"
              fill="currentColor"
            />
            <path d="M11 18C11 11.9249 15.9249 7 22 7V11C18.134 11 15 14.134 15 18H11Z" fill="currentColor" />
            <path d="M25 18C25 11.9249 29.9249 7 36 7V11C32.134 11 29 14.134 29 18H25Z" fill="currentColor" />
            <path d="M11 18H15V25C15 28.866 11.866 32 8 32V28C9.65685 28 11 26.6569 11 25V18Z" fill="currentColor" />
            <path d="M25 18H29V25C29 28.866 25.866 32 22 32V28C23.6569 28 25 26.6569 25 25V18Z" fill="currentColor" />
          </svg>
           {/* Simple custom quote svg as backup or just text if icon is hard to replicate exactly */}
           <span className="text-6xl font-serif text-white/50">“</span>
        </div>

        <blockquote className="text-2xl xl:text-3xl font-medium leading-relaxed mb-12">
          Eztrackr has significantly improved my job hunting experience. Now I can focus more on preparing interviews and less on managing and tracking applications. Would highly recommend it to people who are actively applying for jobs.
        </blockquote>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden border-2 border-white/30">
             {/* Placeholder for avatar */}
             <div className="w-full h-full bg-zinc-400 flex items-center justify-center text-xs">VS</div>
          </div>
          <div>
            <div className="font-bold text-lg">Vishanth Surresh</div>
            <div className="text-white/70 text-sm italic">Data Engineer at Intact</div>
          </div>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
           {/* Decorative paper icon */}
           <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="80" height="100" rx="4" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" />
              <line x1="35" y1="40" x2="85" y2="40" stroke="white" strokeWidth="2" />
              <line x1="35" y1="60" x2="85" y2="60" stroke="white" strokeWidth="2" />
              <line x1="35" y1="80" x2="65" y2="80" stroke="white" strokeWidth="2" />
           </svg>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-[500px]">
          {children}
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Floating Stickers */}
      <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-6 pointer-events-none opacity-40">
        <div className="w-16 h-16 bg-white rounded-2xl rotate-[-12deg] flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-orange-400">?</span>
        </div>
        <div className="w-16 h-16 bg-white rounded-2xl rotate-[8deg] flex items-center justify-center shadow-lg -translate-y-6">
          <span className="text-3xl text-blue-500">★</span>
        </div>
      </div>
    </div>
  );
}
