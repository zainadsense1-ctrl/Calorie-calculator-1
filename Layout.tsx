import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold text-primary">VitalAge</span>
            </Link>
            <span className="hidden md:inline-block text-sm text-muted-foreground border-l pl-6 py-1">
              Health Calculators for the Active 50+
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <div className="group relative">
              <button className="flex items-center gap-1 hover:text-primary transition-colors py-2">
                Calculators
              </button>
              <div className="absolute top-full right-0 w-48 bg-card border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="flex flex-col py-2">
                  <Link href="/tdee-calculator" className="px-4 py-2 hover:bg-muted transition-colors">TDEE</Link>
                  <Link href="/macro-calculator" className="px-4 py-2 hover:bg-muted transition-colors">Macros</Link>
                  <Link href="/bmi-calculator" className="px-4 py-2 hover:bg-muted transition-colors">BMI</Link>
                  <Link href="/body-fat-calculator" className="px-4 py-2 hover:bg-muted transition-colors">Body Fat</Link>
                  <Link href="/water-intake-calculator" className="px-4 py-2 hover:bg-muted transition-colors">Water</Link>
                  <Link href="/ideal-weight-calculator" className="px-4 py-2 hover:bg-muted transition-colors">Ideal Weight</Link>
                </div>
              </div>
            </div>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </nav>

          <button 
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b bg-background">
            <div className="flex flex-col px-4 py-4 space-y-4 text-sm font-medium">
              <div className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Calculators</div>
              <Link href="/tdee-calculator" className="pl-4 py-1 hover:text-primary">TDEE Calculator</Link>
              <Link href="/macro-calculator" className="pl-4 py-1 hover:text-primary">Macro Calculator</Link>
              <Link href="/bmi-calculator" className="pl-4 py-1 hover:text-primary">BMI Calculator</Link>
              <Link href="/body-fat-calculator" className="pl-4 py-1 hover:text-primary">Body Fat Calculator</Link>
              <Link href="/water-intake-calculator" className="pl-4 py-1 hover:text-primary">Water Intake Calculator</Link>
              <Link href="/ideal-weight-calculator" className="pl-4 py-1 hover:text-primary">Ideal Weight Calculator</Link>
              <div className="h-px bg-border my-2" />
              <Link href="/blog" className="py-1 hover:text-primary">Blog</Link>
              <Link href="/about" className="py-1 hover:text-primary">About</Link>
              <Link href="/contact" className="py-1 hover:text-primary">Contact</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/40 py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="text-xl font-semibold text-primary mb-4">VitalAge</div>
              <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
                The premier resource for adults 50+ who want to understand their body, optimize nutrition, and stay active without guesswork.
              </p>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} VitalAge. All rights reserved.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Health Disclaimer</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
