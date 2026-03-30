export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black relative overflow-hidden">
      {/* Decorative blurred background orbs for a premium glassmorphic feel */}
      <div className="absolute top-0 -translate-y-12 translate-x-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Main Container */}
      <div className="z-10 w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
}
