import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, User, MapPin, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    cropType: "",
    farmSize: "",
  });

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.match(/[A-Z]/)) strength += 25;
    if (pass.match(/[0-9]/)) strength += 25;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: formData.email,
        password: password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (signUpError) throw signUpError;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          email: formData.email,
          location: formData.location,
          crop_type: formData.cropType,
          farm_size: formData.farmSize,
        })
        .eq('id', data.user?.id);

      if (profileError) throw profileError;

      toast({
        title: "Account Created",
        description: "Welcome to FarmGenius! You can now sign in.",
      });

      navigate('/sign-in');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Join FarmGenius and start managing your farm smarter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="pl-10"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={isLoading}
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
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Create a password"
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Progress value={passwordStrength} className={getStrengthColor()} />
                        <p className="text-sm text-muted-foreground">
                          Password strength: {getStrengthText()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium">
                        Farm Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="Enter your farm location"
                          className="pl-10"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="cropTypes" className="text-sm font-medium">
                        Primary Crops
                      </label>
                      <div className="relative">
                        <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select
                          id="cropTypes"
                          className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.cropType}
                          onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                          disabled={isLoading}
                        >
                          <option value="">Select your primary crops</option>
                          <option value="wheat">Wheat</option>
                          <option value="corn">Corn</option>
                          <option value="rice">Rice</option>
                          <option value="soybeans">Soybeans</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="farmSize" className="text-sm font-medium">
                        Farm Size (hectares)
                      </label>
                      <Input
                        id="farmSize"
                        type="number"
                        placeholder="Enter farm size"
                        min="0"
                        value={formData.farmSize}
                        onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked: boolean) => setAgreedToTerms(checked)}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:underline"
                      >
                        terms and conditions
                      </Link>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full transition-all hover:scale-105"
                    disabled={!agreedToTerms || isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="text-primary hover:underline transition-colors hover:text-primary/80"
                    >
                      Sign in
                    </Link>
                  </p>
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

export default SignUp;
