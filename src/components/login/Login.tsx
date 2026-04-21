"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, User, Shield, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function Login({ initialIsLogin = true }: { initialIsLogin?: boolean }) {
  const router = useRouter();
  const { login, register, isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    // Improved name derivation: use provided name, or derive from email prefix if logging in
    let loginName = isLogin ? formData.firstName : fullName;
    
    if (!loginName || loginName.toLowerCase() === "user") {
      const emailPrefix = formData.email.split("@")[0];
      loginName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    }

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.email, formData.password, loginName);
    }

    if (result.success) {
      if (isLogin) {
        toast.success(`Welcome back!`);
        addNotification(`Welcome back! You have successfully logged in.`, "success");
        router.push("/home");
      } else {
        toast.success("Account created successfully! Please log in to continue.");
        addNotification(`Account created for ${loginName}! Please log in to your account.`, "success");
        // Clear sensitive fields and switch to login view
        setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
        setIsLogin(true);
      }
    } else {
      toast.error(result.error || "Authentication failed");
      addNotification(result.error || "Please check your credentials and try again.", "error");
    }
  };

  const dark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className={`min-h-screen flex flex-col items-center relative overflow-hidden px-4 font-sans pt-16 pb-10 transition-colors duration-300 ${dark ? 'bg-[#020617]' : 'bg-[#f0f4ff]'}`}>
      {/* Background Decorative Elements */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-opacity duration-1000 ${dark ? 'bg-blue-600/10' : 'bg-blue-400/20'}`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-opacity duration-1000 ${dark ? 'bg-indigo-600/10' : 'bg-indigo-400/20'}`}></div>

      <div className="w-full max-w-[480px] relative z-10 flex flex-col items-center">
        {/* Toggle Switch */}
        <div className={`p-1 rounded-full mb-12 flex items-center backdrop-blur-md border transition-all duration-300 w-fit ${dark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white/50 border-slate-200'}`}>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              !isLogin 
                ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" 
                : dark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isLogin 
                ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" 
                : dark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Log In
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-semibold mb-3 tracking-tight transition-colors duration-300 ${dark ? 'text-white' : 'text-slate-900'}`}>
            {isLogin ? "Welcome Back" : "Create An Account"}
          </h1>
          <p className={`text-lg transition-colors duration-300 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            {isLogin ? "Access your study resources" : "Join our student community today"}
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Container - Side by Side (Image 1 Style) */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="group">
                  <div className={`relative flex items-center border rounded-2xl transition-all duration-300 group-focus-within:border-indigo-500/50 ${dark ? 'bg-[#1e293b]/40 group-focus-within:bg-[#1e293b]/60' : 'bg-white group-focus-within:bg-white'} ${formData.firstName ? (dark ? 'border-slate-700' : 'border-slate-300') : (dark ? 'border-slate-800' : 'border-slate-200')}`}>
                    <input
                      type="text"
                      required={!isLogin}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First Name"
                      className={`w-full bg-transparent pl-5 pr-4 py-4 outline-none autofill:shadow-[0_0_0_1000px_${dark ? '#020617' : '#f0f4ff'}_inset] transition-colors duration-300 ${dark ? 'text-slate-400 placeholder:text-slate-400 autofill:text-slate-400' : 'text-slate-700 placeholder:text-slate-500 autofill:text-slate-700'}`}
                    />
                  </div>
                </div>
                <div className="group">
                  <div className={`relative flex items-center border rounded-2xl transition-all duration-300 group-focus-within:border-indigo-500/50 ${dark ? 'bg-[#1e293b]/40 group-focus-within:bg-[#1e293b]/60' : 'bg-white group-focus-within:bg-white'} ${formData.lastName ? (dark ? 'border-slate-700' : 'border-slate-300') : (dark ? 'border-slate-800' : 'border-slate-200')}`}>
                    <input
                      type="text"
                      required={!isLogin}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last Name"
                      className={`w-full bg-transparent pl-5 pr-4 py-4 outline-none autofill:shadow-[0_0_0_1000px_${dark ? '#020617' : '#f0f4ff'}_inset] transition-colors duration-300 ${dark ? 'text-slate-400 placeholder:text-slate-400 autofill:text-slate-400' : 'text-slate-700 placeholder:text-slate-500 autofill:text-slate-700'}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="group relative">
              <div className={`flex items-center border rounded-2xl transition-all duration-300 group-focus-within:border-indigo-500/50 ${dark ? 'bg-[#1e293b]/40 group-focus-within:bg-[#1e293b]/60' : 'bg-white group-focus-within:bg-white'} ${formData.email ? (dark ? 'border-slate-700' : 'border-slate-300') : (dark ? 'border-slate-800' : 'border-slate-200')}`}>
                <Mail className={`ml-5 w-5 h-5 transition-colors ${formData.email ? 'text-indigo-400' : (dark ? 'text-slate-500' : 'text-slate-400')} group-focus-within:text-indigo-400`} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter Your Email"
                  className={`w-full bg-transparent pl-4 pr-4 py-4 outline-none autofill:shadow-[0_0_0_1000px_${dark ? '#020617' : '#f0f4ff'}_inset] transition-colors duration-300 ${dark ? 'text-slate-400 placeholder:text-slate-400 autofill:text-slate-400' : 'text-slate-700 placeholder:text-slate-500 autofill:text-slate-700'}`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group relative">
              <div className={`flex items-center border rounded-2xl transition-all duration-300 group-focus-within:border-indigo-500/50 ${dark ? 'bg-[#1e293b]/40 group-focus-within:bg-[#1e293b]/60' : 'bg-white group-focus-within:bg-white'} ${formData.password ? (dark ? 'border-slate-700' : 'border-slate-300') : (dark ? 'border-slate-800' : 'border-slate-200')}`}>
                <Lock className={`ml-5 w-5 h-5 transition-colors ${formData.password ? 'text-indigo-400' : (dark ? 'text-slate-500' : 'text-slate-400')} group-focus-within:text-indigo-400`} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password"
                  className={`w-full bg-transparent pl-4 pr-12 py-4 outline-none autofill:shadow-[0_0_0_1000px_${dark ? '#020617' : '#f0f4ff'}_inset] transition-colors duration-300 ${dark ? 'text-slate-400 placeholder:text-slate-400 autofill:text-slate-400' : 'text-slate-700 placeholder:text-slate-500 autofill:text-slate-700'}`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 transition-colors ${dark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {!isLogin && (
              <div className="group relative animate-in fade-in slide-in-from-top-2 duration-500 delay-150">
                <div className={`flex items-center border rounded-2xl transition-all duration-300 group-focus-within:border-indigo-500/50 ${dark ? 'bg-[#1e293b]/40 group-focus-within:bg-[#1e293b]/60' : 'bg-white group-focus-within:bg-white'} ${formData.confirmPassword ? (dark ? 'border-slate-700' : 'border-slate-300') : (dark ? 'border-slate-800' : 'border-slate-200')}`}>
                  <Shield className={`ml-5 w-5 h-5 transition-colors ${formData.confirmPassword ? 'text-indigo-400' : (dark ? 'text-slate-500' : 'text-slate-400')} group-focus-within:text-indigo-400`} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm Password"
                    className={`w-full bg-transparent pl-4 pr-12 py-4 outline-none autofill:shadow-[0_0_0_1000px_${dark ? '#020617' : '#f0f4ff'}_inset] transition-colors duration-300 ${dark ? 'text-slate-400 placeholder:text-slate-400 autofill:text-slate-400' : 'text-slate-700 placeholder:text-slate-500 autofill:text-slate-700'}`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-4 transition-colors ${dark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button - Image 1 Style with Glow */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLogin ? "Sign In" : "Create an Account"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

        </div>

        {/* Footer Branding */}
        <div className={`mt-6 flex items-center gap-2 transition-opacity ${dark ? 'opacity-60 hover:opacity-100' : 'opacity-80 hover:opacity-100'}`}>
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span className={`font-medium ${dark ? 'text-white' : 'text-slate-900'}`}>Study Hub</span>
          <span className={`${dark ? 'text-slate-500' : 'text-slate-400'} text-sm`}>| Material Portal</span>
        </div>
      </div>
    </div>
  );
}
