
import { Mail, Phone, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About FarmGenius</h3>
            <p className="text-gray-600 text-sm">
              An AI-powered platform dedicated to revolutionizing farming through smart technology,
              helping farmers make data-driven decisions for better yields.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Features', 'Weather Forecast', 'Market Prices', 'Sustainability', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-primary text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@farmgenius.com"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@farmgenius.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
              <div className="flex gap-4 mt-4">
                {[Facebook, Twitter, Instagram].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-primary transition-all duration-200 hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="w-full group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} FarmGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
