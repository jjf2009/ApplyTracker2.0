import { Button } from "@/components/ui/button";
import { Check } from "@phosphor-icons/react/dist/ssr";

const plans = [
  {
    name: "Individuals",
    price: "0",
    description: "Perfect for casual job seekers staying organized.",
    features: [
      "Up to 50 active applications",
      "Manual status tracking",
      "Basic search insights",
      "Mobile dashboard access",
      "Email support"
    ],
    cta: "Start for free",
    highlighted: false
  },
  {
    name: "Pro Searcher",
    price: "12",
    description: "For serious candidates who want every advantage.",
    features: [
      "Unlimited applications",
      "AI-Powered Interview Prep",
      "One-click browser extension",
      "Advanced funnel analytics",
      "Priority priority support",
      "Custom status categories"
    ],
    cta: "Upgrade to Pro",
    highlighted: true
  },
  {
    name: "Organizations",
    price: null,
    description: "Empower your team with collaborative tracking tools.",
    features: [
      "Team-based application boards",
      "Shared company insights",
      "Admin role management",
      "Custom domain & branding",
      "Dedicated account manager",
      "API access"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
            Plans that grow with your career.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto text-center">
            Whether you're looking for your first role or your next big move, we have a plan for you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.highlighted 
                  ? "bg-white border-purple-200 ring-4 ring-purple-50" 
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{plan.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price === null ? "Custom" : `$${plan.price}`}
                  </span>
                  {plan.price !== null && (
                    <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
                  )}
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 leading-tight">
                    <div className="mt-0.5 p-0.5 bg-purple-100 rounded-full">
                      <Check size={12} weight="bold" className="text-purple-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-12 rounded-xl text-sm font-bold transition-all shadow-md ${
                  plan.highlighted 
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200" 
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-none border border-gray-200"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            All plans include a 14-day money-back guarantee. No hidden fees.
          </p>
        </div>
      </div>
    </section>
  );
}
