export interface AppTheme {
  page: string;
  blur1: string;
  blur2: string;
  card: string;
  logo: string;
  tagline: string;
  toggleBtn: string;
  heading: string;
  subtext: string;
  label: string;
  input: string;
  inputIcon: string;
  eyeBtn: string;
  dividerLine: string;
  dividerText: string;
  checkLabel: string;
  forgotLink: string;
  badge: string;
  footerText: string;
  signupLink: string;
  featureCard: string;
  featureTitle: string;
  featureDesc: string;
  bottomBar: string;
  select: string;
  selectOption: string;
  strengthBg: string;
  termsText: string;
}

export const darkTheme: AppTheme = {
  page: "bg-[#070B34]",
  blur1: "bg-purple-600/30",
  blur2: "bg-blue-600/30",
  card: "bg-white/5 border-white/10",
  logo: "text-white",
  tagline: "text-gray-400",
  toggleBtn: "bg-white/5 border-white/10 text-gray-400 hover:text-white",
  heading: "text-white",
  subtext: "text-gray-400",
  label: "text-gray-300",
  input:
    "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500",
  inputIcon: "text-gray-400",
  eyeBtn: "text-gray-400 hover:text-white",
  dividerLine: "bg-white/10",
  dividerText: "text-gray-400",
  checkLabel: "text-gray-300",
  forgotLink: "text-purple-500 hover:text-purple-400",
  badge: "text-gray-400",
  footerText: "text-gray-400",
  signupLink: "text-purple-500 hover:text-purple-400",
  featureCard: "bg-white/5 border-white/10 backdrop-blur-lg",
  featureTitle: "text-white",
  featureDesc: "text-gray-400",
  bottomBar: "text-gray-500",
  select: "bg-[#0B102F] border-white/10 text-white focus:border-purple-500",
  selectOption: "bg-[#0B102F]",
  strengthBg: "bg-white/10",
  termsText: "text-gray-300",
};

export const lightTheme: AppTheme = {
  page: "bg-slate-100",
  blur1: "bg-purple-300/40",
  blur2: "bg-blue-300/40",
  card: "bg-white border-slate-200 shadow-xl",
  logo: "text-slate-800",
  tagline: "text-slate-500",
  toggleBtn:
    "bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-800",
  heading: "text-slate-800",
  subtext: "text-slate-500",
  label: "text-slate-600",
  input:
    "bg-slate-50 border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-purple-500",
  inputIcon: "text-slate-400",
  eyeBtn: "text-slate-400 hover:text-slate-700",
  dividerLine: "bg-slate-200",
  dividerText: "text-slate-400",
  checkLabel: "text-slate-600",
  forgotLink: "text-purple-500 hover:text-purple-400",
  badge: "text-slate-500",
  footerText: "text-slate-500",
  signupLink: "text-purple-500 hover:text-purple-400",
  featureCard: "bg-white border-slate-200 shadow-sm",
  featureTitle: "text-slate-700",
  featureDesc: "text-slate-500",
  bottomBar: "text-slate-400",
  select: "bg-slate-50 border-slate-300 text-slate-800 focus:border-purple-500",
  selectOption: "bg-white",
  strengthBg: "bg-slate-200",
  termsText: "text-slate-600",
};
