import { Smartphone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1E1F4A] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xs flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">COMSATS PLUS</span>
            </div>
            <p className="text-blue-100 font-medium">
              Making university life easier for COMSATS students, one feature at a time.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Features</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/room-finder" className="hover:text-white transition-colors font-medium">
                  Room Finder
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors font-medium">
                  GPA Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors font-medium">
                  Memory Map
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=help-support" className="hover:text-white transition-colors font-medium">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=feedback" className="hover:text-white transition-colors font-medium">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors font-medium">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors font-medium">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors font-medium">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
          <p className="font-medium">&copy; 2025 COMSATS PLUS. Made with ❤️ for COMSATS University Lahore students.</p>
        </div>
      </div>
    </footer>
  )
}
