import Link from "next/link";
import { Tag, TwitterLogo, LinkedinLogo, GithubLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-purple-600 p-1.5 rounded-lg">
                <Tag weight="fill" className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">eztrackr</span>
            </Link>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              The smartest way to track your job applications and stay organized during your search.
            </p>
            <div className="flex gap-4 mt-8">
              {[TwitterLogo, LinkedinLogo, GithubLogo, InstagramLogo].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                  <Icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4">
              {["Features", "Browser Extension", "AI Tools", "Pricing", "Enterprise"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4">
              {["Blog", "Career Guide", "Interview Tips", "Resume Templates", "Docs"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} eztrackr. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-purple-600 text-sm">Status</a>
            <a href="#" className="text-gray-400 hover:text-purple-600 text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-purple-600 text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
