'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';
import Link from 'next/link';
import footerData from '@/data/footer.json';
import { FooterData } from '@/types';

const data = footerData as FooterData;

/** Inline SVG social icons since lucide-react doesn't include brand icons */
const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
};

/**
 * Site footer with contact info, links, and newsletter.
 * 4-column responsive layout.
 */
export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0C0C0C] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Logo & Contact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Leaf icon */}
              <div className="w-8 h-8 rounded-full bg-[#1B7A53] flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.25C7.76 17.08 9.9 11.42 17 8Z"
                    fill="white"
                  />
                  <path
                    d="M12.82 5.58C14.08 4.32 15.92 3.71 17.82 3.82C17.93 5.72 17.32 7.56 16.06 8.82C14.8 10.08 12.96 10.69 11.06 10.58C10.95 8.68 11.56 6.84 12.82 5.58Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-wide">
                <span className="text-[#1B7A53] font-extrabold">ANANT</span>
                <span className="text-[#1B7A53] font-normal ml-1">AYURVEDA</span>
              </span>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed">
              {data.address}
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              {data.socialLinks.map((social) => {
                const icon = socialIcons[social.icon];
                return (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.platform}
                  >
                    {icon}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {data.quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2.5">
              {data.supportLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              {data.newsletter.heading}
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              {data.newsletter.description}
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-[#1A1A1A] text-white text-sm px-4 py-2.5 rounded-l-full border border-white/10 border-r-0 focus:outline-none focus:border-[#1B7A53] placeholder:text-gray-500"
              />
              <motion.button
                className="bg-[#1B7A53] text-white p-2.5 rounded-r-full hover:bg-[#166040] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Subscribe to newsletter"
              >
                <SendHorizonal size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8">
          <p className="text-center text-gray-600 text-xs tracking-wider uppercase">
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
