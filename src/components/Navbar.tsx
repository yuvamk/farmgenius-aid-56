import { useState } from "react";
import { Menu, X, Sun, Moon, Search, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
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
  const { theme, toggleTheme } = useTheme();

  const languages = ['English', 'Español', 'हिंदी', '中文'];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border dark-mode-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-primary transition-transform hover:scale-105 duration-300">
              FarmGenius
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <TooltipProvider>
              {[
                { href: "#", label: "Home", tooltip: "Back to homepage" },
                { href: "#features", label: "Features", tooltip: "Explore our features" },
                { href: "#weather", label: "Weather Forecast", tooltip: "Check weather conditions" },
                { href: "#disease", label: "Crop Disease", tooltip: "AI-powered disease detection" },
                { href: "#pests", label: "Pest Management", tooltip: "Smart pest control" },
                { href: "#market", label: "Market Prices", tooltip: "Real-time market data" },
                { href: "#sustainability", label: "Sustainability", tooltip: "Eco-friendly practices" },
                { href: "#contact", label: "Contact", tooltip: "Get in touch with us" },
              ].map(({ href, label, tooltip }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <a href={href} className="nav-link">
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

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10"
              >
                <Globe className="h-5 w-5" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible transition-all duration-200 opacity-0 group-hover:opacity-100">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-primary/10 ${
                      selectedLanguage === lang ? 'text-primary' : 'text-gray-700'
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
                  className="absolute right-0 top-0 h-10 w-64 px-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 animate-fadeIn"
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-primary/10"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="hover:border-primary/20 hover:bg-primary/5 transition-colors"
            >
              Sign In
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 button-glow transition-transform hover:scale-105 duration-300"
            >
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-slideIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="mobile-nav-link">Home</a>
            <a href="#features" className="mobile-nav-link">Features</a>
            <a href="#weather" className="mobile-nav-link">Weather Forecast</a>
            <a href="#disease" className="mobile-nav-link">Crop Disease</a>
            <a href="#pests" className="mobile-nav-link">Pest Management</a>
            <a href="#market" className="mobile-nav-link">Market Prices</a>
            <a href="#sustainability" className="mobile-nav-link">Sustainability</a>
            <a href="#contact" className="mobile-nav-link">Contact</a>
            
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="px-3 py-2">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 space-y-2 px-3">
              <Button className="w-full" variant="outline">Sign In</Button>
              <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
