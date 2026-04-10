import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCofirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Password do not match";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const newFieldErrors = { ...fieldErrors };
      if (name === "name") {
        newFieldErrors.name = validateName(value);
      } else if (name === "email") {
        newFieldErrors.email = validateEmail(value);
      } else if (name === "password") {
        newFieldErrors.password = validatePassword(value);
        if (touched.confirmPassword) {
          newFieldErrors.confirmPassword = validateConfirmPassword(
            formData.confirmPassword,
            value,
          );
        }
      } else if (name === "confirmPassword") {
        newFieldErrors.confirmPassword = validateConfirmPassword(
          value,
          formData.password,
        );
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

    const newFieldErrors = { ...fieldErrors };
    if (name === "name") {
      newFieldErrors.name = validateName(formData.name);
    } else if (name === "email") {
      newFieldErrors.email = validateEmail(formData.email);
    } else if (name === "password") {
      newFieldErrors.password = validatePassword(formData.password);
    } else if (name === "confirmPassword") {
      newFieldErrors.confirmPassword = validateConfirmPassword(
        formData.confirmPassword,
        formData.password,
      );
    }
  };

  const isFromValid = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password,
    );

    return (
      !nameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    );
  };

  const handleSubmit = async () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password,
    );

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setFieldErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      const { token } = data;

      if (response.status === 201) {
        setSuccess("Account created successfully");

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTouched({
          name: false,
          email: false,
          password: false,
          confirmPassword: false,
        });

        login(data, token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
      console.error("API error:", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white px-4 py-8 min-h-screen">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/">
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-950 to-blue-900 m-6 mx-auto rounded-xl w-12 h-12">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="mb-2 font-semibold text-gray-900 text-2xl">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">Join BillWise Today</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Full Name
            </label>
            <div className="relative">
              <User className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all
                ${
                  fieldErrors.name && touched.name
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black"
                }
              `}
                placeholder="Enter your full name"
              />
            </div>
            {fieldErrors.name && touched.name && (
              <p className="mt-1 text-red-600 text-sm">{fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
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
                className={`w-full pl-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all
                ${
                  fieldErrors.password && touched.password
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black"
                }
              `}
                placeholder="Create a password"
              />
              <button
                type="button"
                className="top-1/2 right-4 absolute text-gray-400 hover:text-gray-600 transition-colors -translate-y-1/2 transform"
                onClick={() => setShowPassword((prev) => !prev)}>
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
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
              <input
                name="confirmPassword"
                type={showCofirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all
                ${
                  fieldErrors.confirmPassword && touched.confirmPassword
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black"
                }
              `}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showCofirmPassword)}
                className="top-1/2 right-4 absolute text-gray-400 hover:text-gray-600 transition-colors -translate-y-1/2 transform">
                {showCofirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {fieldErrors.confirmPassword && touched.confirmPassword && (
              <p className="mt-1 text-red-600 text-sm">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>
          {error && (
            <div className="bg-red-50 p-3 border rounded-lg border=red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-red-50 p-3 border rounded-lg border=red-200">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <div className="flex items-start pt-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 border-gray-300 rounded focus:ring-black w-4 h-4 text-black"
              required
            />
            <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
              I agree to the{" "}
              <button className="text-black hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-black hover:underline">
                Privacy Policy
              </button>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !isFromValid()}
            className="group flex justify-center items-center hover:bg-gray-800 disabled:bg-gray-300 bg-gradient-to-r from-blue-950 to-blue-900 px-4 py-3 rounded-lg w-full font-medium text-white transition-colors cursor-pointer disabled:cursor-not-allowed">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Creating account ...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        <div className="mt-6 pt-4 border-gray-200 border-t text-center">
          <p className="text-gray-600 text-sm">
            Already have an accout?{" "}
            <button
              className="font-medium text-black hover:underline"
              onClick={() => navigate("/login")}>
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
