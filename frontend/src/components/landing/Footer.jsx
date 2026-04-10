import { FileText, Github, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const FooterLink = ({ to, href, children }) => {
  const className =
    "block text-gray-400 hover:text-white transition-colors duration-200";
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

const SocialLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="flex justify-center items-center bg-blue-950 hover:bg-gray-700 rounded-lg w-10 h-10 transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer">
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="flex justify-center items-center bg-blue-950 rounded-md w-8 h-8">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">BillWise</span>
            </Link>
            <p className="max-w-sm text-gray-400 leading-relaxed">
              The simplest way to create and send professional invoices.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-base">Product</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="#features">Features</FooterLink>
              </li>
              <li>
                <FooterLink href="#testimonials">Testimonials</FooterLink>
              </li>
              <li>
                <FooterLink href="#FAQs">FAQs</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-base">Company</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-base">Legal</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 py-8 border-gray-800 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              &copy; 2025 BillWise. Created by Nikhil.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#">
                <Twitter className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#">
                <Github className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#">
                <Linkedin className="w-5 h-5" />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
