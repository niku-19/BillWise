import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const newFieldErrors = { ...fieldErrors };
      if (name === "email") {
        newFieldErrors.email = validateEmail(value);
      } else if (name === "password") {
        newFieldErrors.password = validatePassword(value);
      }
      setFieldErrors(newFieldErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    const newFieldErrors = { ...fieldErrors };
    if (name === "email") {
      newFieldErrors.email = validateEmail(formData.email);
    } else if (name === "password") {
      newFieldErrors.password = validatePassword(formData.password);
    }
    setFieldErrors(newFieldErrors);
  };

  const isFormValid = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    return !emailError && !passwordError && formData.email && formData.password;
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError,
      });
      setTouched({
        email: true,
        password: true,
      });
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);

      if (response.status === 200) {
        const { token } = response.data;

        if (token) {
          setSuccess("Login successful");
          login(response.data, token);

          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 2000);
        }
      } else {
        setError(response.data.message || "Invalid Credientials");
      }
    } catch (error) {
      (<console className="erro"></console>)(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white px-4 min-h-screen">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/">
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-950 to-blue-900 mx-auto mb-6 rounded-xl w-12 h-12">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="mb-2 font-semibold text-gray-900 text-2xl">
            Login to Your Account
          </h1>
          <p className="text-gray-600 text-sm">Welcome back to BillWise</p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor=""
              className="block mb-2 font-medium text-gray-700 text-sm">
              Email
            </label>
            <div className="relative">
              <Mail className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all
                 ${
                   fieldErrors.email && touched.email
                     ? "border-red-300 focus:ring-red-500"
                     : "border-gray-300 focus:ring-black"
                 }
                `}
                placeholder="Enter your email"
              />
            </div>
            {fieldErrors.email && touched.email && (
              <p className="mt-1 text-red-600 text-sm">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Password
            </label>
            <div className="relative">
              <Lock className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all
                  ${
                    fieldErrors.password && touched.password
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-black"
                  }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="top-1/2 right-4 absolute text-gray-400 hover:text-gray-600 transition-colors -translate-y-1/2 transform">
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {fieldErrors.password && touched.password && (
              <p className="mt-1 text-red-600 text-sm">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 p-3 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 p-3 border border-green-200 rounded-lg">
              <p className="text-green=600 text-sm">{success}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
            className="group flex justify-center items-center hover:bg-gray-800 disabled:bg-gray-300 bg-gradient-to-r from-blue-950 to-blue-900 px-4 py-3 rounded-lg w-full font-medium text-white transition-colors hover:cursor-pointer disabled:cursor-not-allowed">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
        <div className="mt-6 pt-4 border-gray-200 border-t text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              className="font-medium text-black hover:underline"
              onClick={() => navigate("/signup")}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
