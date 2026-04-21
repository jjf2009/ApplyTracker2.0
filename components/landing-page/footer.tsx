import Link from "next/link";
import { Tag, TwitterLogo, LinkedinLogo, GithubLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <Tag weight="fill" className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">trackezz</span>
        </Link>
        <p className="text-gray-500 text-center max-w leading-relaxed mb-6">
          The smartest way to track your job applications and stay organized during your search.
        </p>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} trackezz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
