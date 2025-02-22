
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const { user, profile, signOut } = useUser();
  const navigate = useNavigate();

  const languages = ['English', 'Español', 'हिंदी', '中文'];

  const navItems = [
    { href: "/", label: "Home", tooltip: "Back to homepage" },
    { href: "/weather-forecast", label: "Weather Forecast", tooltip: "Check weather conditions" },
    { href: "/crop-disease", label: "Crop Disease", tooltip: "AI-powered disease detection" },
    { href: "/pest-management", label: "Pest Management", tooltip: "Smart pest control" },
    { href: "/market-prices", label: "Market Prices", tooltip: "Real-time market data" },
    { href: "/contact", label: "Contact", tooltip: "Get in touch with us" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase() || '?';
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-transform hover:scale-105 duration-300">
                FarmGenius
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <TooltipProvider>
              {navItems.map(({ href, label, tooltip }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Link to={href} className="nav-link text-sm font-medium">
                      {label}
                    </Link>
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata.avatar_url} alt={profile?.name || user.email} />
                      <AvatarFallback>{getInitials(profile?.name || user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.name || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Farm Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button 
                    variant="outline" 
                    className="hover:bg-primary/5 border-gray-200"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button 
                    className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
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
            {navItems.map(({ href, label }) => (
              <Link
                key={label}
                to={href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            
            {user ? (
              <div className="px-3 py-2">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata.avatar_url} alt={profile?.name || user.email} />
                    <AvatarFallback>{getInitials(profile?.name || user.email)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{profile?.name || user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mb-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/profile');
                  }}
                >
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSignOut}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="px-3 py-2">
                <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full mb-2" variant="outline">Sign In</Button>
                </Link>
                <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
