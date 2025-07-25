import { Link, useLocation } from "wouter";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/therapists", label: "Find Therapists" },
    { href: "/community", label: "Community" },
    { href: "/chat", label: "Anonymous Chat" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Heart className="text-white h-4 w-4 fill-current" />
            </div>
            <span className="text-xl font-semibold text-gray-900">MindConnect</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  location === link.href
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button className="hidden sm:block bg-primary text-white hover:bg-primary/90">
              Get Started
            </Button>
            
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 transition-colors ${
                    location === link.href
                      ? "text-primary font-medium"
                      : "text-gray-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="mx-4 bg-primary text-white hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
