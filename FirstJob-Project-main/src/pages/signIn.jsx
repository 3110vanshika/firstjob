import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { toast } from 'react-toastify';

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Verify the data
  
    try {
      const response = await axios.post("http://localhost:8000/api/candidate/login", formData);
  
      if (response.status === 200) {
        const { token, message } = response.data;
        toast.success(message);
        localStorage.setItem("token", token); 
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="text-3xl font-bold">Welcome. We exist to make entrepreneurship easier.</h1>
      </div>
      <div className="max-w-md mx-auto bg-[#020817] shadow-md rounded-lg p-8">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-muted-foreground">Welcome back! Please sign in to your account.</p>
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  name="password"
                  value={formData?.password}
                  onChange={handleChange}
                  />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full mt-4" >
              Sign in
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="destructive" className="w-full">
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
        <div className="flex justify-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
