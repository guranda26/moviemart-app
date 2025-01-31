import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-footerBg text-textCol py-3 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MovieStream. All rights reserved.</p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-6 text-xs md:text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
