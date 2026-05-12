import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/button/Button";
import AuthLayout from "./AuthLayout";

function getPasswordStrength(password: string): {
  label: string;
  color: string;
  segments: [string, string, string];
} {
  if (!password)
    return {
      label: "",
      color: "",
      segments: ["bg-white/10", "bg-white/10", "bg-white/10"],
    };
  if (password.length < 6)
    return {
      label: "Weak",
      color: "text-red-400",
      segments: ["bg-red-500", "bg-white/10", "bg-white/10"],
    };
  if (
    password.length < 10 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password)
  )
    return {
      label: "Medium",
      color: "text-yellow-400",
      segments: ["bg-yellow-400", "bg-yellow-400", "bg-white/10"],
    };
  return {
    label: "Strong",
    color: "text-green-400",
    segments: ["bg-green-500", "bg-green-500", "bg-green-500"],
  };
}

const Register = () => {
  const navigate = useNavigate();
  const { theme, isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      role: Yup.string().required("Please select a role"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
      agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = {
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          role: values.role,
          password: values.password,
        };
        const response = await axios.post("/api/auth/register", payload);
        console.log(response.data);
        alert("Registration Successful");
        resetForm();
        navigate("/login");
      } catch (error: any) {
        console.log(error);
        alert(error?.response?.data?.message || "Registration Failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const strength = getPasswordStrength(formik.values.password);

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="mb-8">
        <h2 className={`text-4xl font-bold mb-2 ${theme.heading}`}>
          Create Account
        </h2>
        <p className={theme.subtext}>Join Zenvora and start your journey</p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Full Name
          </label>
          <div className="relative">
            <User
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+91 98765 43210"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>Role</label>
          <div className="relative">
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full appearance-none border rounded-xl px-4 py-3 outline-none transition-all cursor-pointer ${theme.select}`}
              style={{ colorScheme: isDark ? "dark" : "light" }}
            >
              <option value="" disabled className={theme.selectOption}>
                Select your role
              </option>
              <option value="hr" className={theme.selectOption}>
                HR
              </option>
              <option value="employee" className={theme.selectOption}>
                Employee
              </option>
              <option value="admin" className={theme.selectOption}>
                Admin
              </option>
              <option value="candidate" className={theme.selectOption}>
                Candidate
              </option>
            </select>
            <ChevronDown
              size={18}
              className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme.inputIcon}`}
            />
          </div>
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.role}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${theme.eyeBtn}`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}

          {/* Password Strength */}
          {formik.values.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs ${theme.label}`}>
                  Password strength:
                </span>
                <span className={`text-xs font-medium ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {strength.segments.map((seg, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      seg === "bg-white/10" ? theme.strengthBg : seg
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className={`text-sm mb-2 block ${theme.label}`}>
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon}`}
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-12 py-3 outline-none transition-all ${theme.input}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${theme.eyeBtn}`}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formik.values.agreeTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-0.5 w-4 h-4 rounded accent-purple-500 shrink-0"
            />
            <span className={`text-sm ${theme.termsText}`}>
              I agree to the{" "}
              <span className="text-purple-500 hover:text-purple-400 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-purple-500 hover:text-purple-400 cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>
          {formik.touched.agreeTerms && formik.errors.agreeTerms && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.agreeTerms}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          loading={formik.isSubmitting}
          loadingText="Creating Account..."
        >
          Create Account
        </Button>
      </form>

      {/* Footer */}
      <p className={`text-center mt-6 text-sm ${theme.footerText}`}>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-purple-500 hover:text-purple-400 font-semibold"
        >
          Sign in here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
