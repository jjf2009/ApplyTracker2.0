import { CheckCircle, Lightning, ChartPieSlice, Robot } from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    title: "One-Click Application Tracking",
    description: "Say goodbye to manual entry. Our browser extension detects when you submit an application and saves it to your dashboard instantly.",
    icon: <Lightning size={32} weight="fill" className="text-purple-600" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    badge: "Most Popular"
  },
  {
    title: "AI-Powered Interview Prep",
    description: "Upload a job description and receive a personalized list of likely interview questions, tailored hints, and best-practice answers.",
    icon: <Robot size={32} weight="fill" className="text-purple-600" />,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
    badge: "Beta"
  },
  {
    title: "Insightful Search Analytics",
    description: "Identify which resumes are getting hits and which platforms are wasting your time with detailed conversion funnels and tracking.",
    icon: <ChartPieSlice size={32} weight="fill" className="text-purple-600" />,
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop",
    badge: "Insight"
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to land your next role.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Stop guessing and start tracking with tools designed for the modern job market.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, i) => (
            <div 
              key={feature.title} 
              className={`flex flex-col lg:items-center gap-12 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium border border-purple-100">
                  {feature.badge}
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {["Instant sync", "Mobile optimized", "Safe & secure"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle size={20} weight="fill" className="text-purple-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
