import { Quotes, Star } from "@phosphor-icons/react/dist/ssr";

const testimonials = [
  {
    quote: "eztrackr saved my sanity. I was applying to 30 jobs a week and kept missing follow-ups. Since switching, I've landed 3 interviews in two weeks.",
    author: "Sarah Jenkins",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"
  },
  {
    quote: "The AI Interview Prep is a game changer. It correctly predicted 4 out of 5 questions I was asked in my final round at Stripe.",
    author: "David Chen",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
  },
  {
    quote: "Clean, fast, and stays out of the way. It's the productivity tool I didn't know I needed for my career search.",
    author: "Marcus Brown",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
            Success stories from our users.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute -top-4 -left-4 bg-purple-600 text-white p-2 rounded-xl shadow-lg transform -rotate-12 transition-transform group-hover:rotate-0">
                <Quotes size={20} weight="fill" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-50"
                />
                <div>
                  <h4 className="font-bold text-gray-900 leading-none">{t.author}</h4>
                  <p className="text-sm text-gray-500 mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
