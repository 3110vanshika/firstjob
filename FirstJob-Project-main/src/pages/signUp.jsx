import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    college_name: "",
    email: "",
    password: "",
    role: "",
    company_name: "",
    company_website: ""
  });
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form refresh on submission
    try {
      const response = await axios.post("http://localhost:8000/api/candidate/", {
        ...formData,
        userType,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h1 text-3xl">Welcome. We exist to make entrepreneurship easier.</h1>
      </div>
      <div className="max-w-md mx-auto bg-[#020817] shadow-md rounded-lg p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <p className="text-center text-muted-foreground">Create an account to start your job search journey.</p>
        </div>
        <form className="space-y-4 mt-6" onSubmit={handleSignUp}>
          {userType === "student" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" name="name" value={formData?.name} placeholder="Enter your full name" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="college_name">College Name</Label>
                <Input id="college_name" type="text" name="college_name" value={formData?.college_name} placeholder="Enter your college name" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" value={formData?.email} placeholder="Enter your email" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData?.password}
                    placeholder="Create a password"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" type="text" name="role" value={formData?.role} placeholder="Enter your role (e.g., Student, Intern)" onChange={handleChange} />
              </div>
            </>
          )}
          {userType === "employer" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" name="name" value={formData?.name} placeholder="Enter your full name" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input id="company_name" type="text" name="company_name" value={formData?.company_name} placeholder="Enter your company name" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_website">Company Website</Label>
                <Input id="company_website" type="text" name="company_website" value={formData?.company_website} placeholder="Enter your company website" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" value={formData?.email} placeholder="Enter your email" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData?.password}
                    placeholder="Create a password"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label>User Type</Label>
            <RadioGroup defaultValue="student" onValueChange={setUserType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employer" id="employer" />
                <Label htmlFor="employer">Employer (Recruiter/HR)</Label>
              </div>
            </RadioGroup>
          </div>
          <button className="w-full bg-red-500 p-2 rounded-md" type="submit">Sign Up</button>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
