
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, Github, Facebook, Apple } from "lucide-react";

const SignIn = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sign In Successful",
      description: "Welcome back to FarmGenius!",
    });
  };

  const handleSocialSignIn = (provider: string) => {
    toast({
      title: "Social Sign In",
      description: `Signing in with ${provider}...`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your FarmGenius account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Sign In */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="w-full transition-all hover:scale-105"
                  onClick={() => handleSocialSignIn("Google")}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  className="w-full transition-all hover:scale-105"
                  onClick={() => handleSocialSignIn("Apple")}
                >
                  <Apple className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full transition-all hover:scale-105"
                  onClick={() => handleSocialSignIn("Facebook")}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full transition-all hover:scale-105"
                >
                  Sign In
                </Button>
                
                <div className="text-center space-y-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline inline-block transition-colors hover:text-primary/80"
                  >
                    Forgot your password?
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link 
                      to="/sign-up" 
                      className="text-primary hover:underline inline-block transition-colors hover:text-primary/80"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
