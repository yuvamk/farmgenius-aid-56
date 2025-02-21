
import { useState } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Español', 'हिंदी', '中文'];

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-transform hover:scale-105 duration-300">
              FarmGenius
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <TooltipProvider>
              {[
                { href: "/", label: "Home", tooltip: "Back to homepage" },
                { href: "#features", label: "Features", tooltip: "Explore our features" },
                { href: "/weather-forecast", label: "Weather Forecast", tooltip: "Check weather conditions" },
                { href: "#disease", label: "Crop Disease", tooltip: "AI-powered disease detection" },
                { href: "#pests", label: "Pest Management", tooltip: "Smart pest control" },
                { href: "#market", label: "Market Prices", tooltip: "Real-time market data" },
                { href: "#sustainability", label: "Sustainability", tooltip: "Eco-friendly practices" },
                { href: "#contact", label: "Contact", tooltip: "Get in touch with us" },
              ].map(({ href, label, tooltip }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <a href={href} className="nav-link text-sm font-medium">
                      {label}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/5"
              >
                <Globe className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-background/95 backdrop-blur-sm rounded-md shadow-lg py-1 invisible group-hover:visible transition-all duration-200 opacity-0 group-hover:opacity-100 border border-gray-100">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-primary/5 ${
                      selectedLanguage === lang ? 'text-primary font-medium' : 'text-gray-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="absolute right-0 top-0 h-10 w-64 px-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background/95 backdrop-blur-sm animate-fadeIn"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-primary/5"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="hover:bg-primary/5 border-gray-200"
            >
              Sign In
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/5"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-gray-100 animate-slideIn">
          <div className="px-4 pt-2 pb-3 space-y-3">
            {[
              { href: "#", label: "Home" },
              { href: "#features", label: "Features" },
              { href: "#weather", label: "Weather Forecast" },
              { href: "#disease", label: "Crop Disease" },
              { href: "#pests", label: "Pest Management" },
              { href: "#market", label: "Market Prices" },
              { href: "#sustainability", label: "Sustainability" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {label}
              </a>
            ))}
            
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              />
            </div>
            
            <div className="px-3 py-2">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 space-y-2 px-3">
              <Button className="w-full" variant="outline">Sign In</Button>
              <Button className="w-full bg-primary hover:bg-primary/90 shadow-md">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
