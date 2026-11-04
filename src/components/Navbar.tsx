'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import navigationData from '@/data/navigation.json';
import { NavigationData } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

const MotionLink = motion(Link as any);

interface NavbarProps {
  onLoginClick: () => void;
  onCartClick?: () => void;
  cartCount?: number;
}

const navData = navigationData as NavigationData;

/**
 * Main navigation bar with logo, links, user icon, and cart.
 * Sticky, dark themed, responsive with mobile drawer.
 */
export default function Navbar({ onLoginClick, onCartClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  
  const cartCount = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-[#111111] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" aria-label="Anant Ayurveda home">
            <BrandLogo className="h-10 text-sm lg:text-base" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navData.links.map((link) => (
              <MotionLink
                key={link.id}
                href={link.href}
                className="text-sm tracking-widest text-gray-300 hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {link.label}
              </MotionLink>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 hidden sm:block">Hi, {session.user?.name}</span>
                {session.user?.email === 'vinitpathak16@gmail.com' && (
                  <Link href="/admin/orders" className="text-xs tracking-wider uppercase text-[#1B7A53] font-bold hover:text-white transition-colors">
                    Admin
                  </Link>
                )}
                <Link href="/orders" className="text-xs tracking-wider uppercase text-gray-300 hover:text-white transition-colors">
                  Orders
                </Link>
                <motion.button
                  onClick={() => signOut()}
                  className="text-xs tracking-wider uppercase text-gray-300 hover:text-white transition-colors border border-white/20 px-3 py-1 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={onLoginClick}
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="User account"
              >
                <User size={22} />
              </motion.button>
            )}

            <motion.button
              onClick={onCartClick}
              className="relative text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={22} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1B7A53] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#111111] border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navData.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="block text-sm tracking-widest text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
