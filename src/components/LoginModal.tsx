'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

/**
 * Login modal with email/password form.
 * White modal on dark overlay with smooth animations.
 */
export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignUp,
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        // Success
        onClose();
        setEmail('');
        setPassword('');
        alert('Successfully logged in!');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-xl w-full max-w-md p-8 sm:p-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Heading */}
            <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm text-center mt-2">
              Welcome back to your wellness journey
            </p>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 tracking-wider uppercase mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-100 text-gray-900 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7A53] placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 tracking-wider uppercase mb-2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-100 text-gray-900 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7A53] placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#1B7A53]"
                  />
                  <span className="text-gray-600 text-sm">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-[#1B7A53] text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1B4D3E] text-white py-3 rounded-lg uppercase text-sm tracking-wider font-semibold hover:bg-[#163D32] transition-colors disabled:opacity-70"
                whileHover={isLoading ? {} : { scale: 1.02 }}
                whileTap={isLoading ? {} : { scale: 0.98 }}
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </motion.button>
            </form>

            {/* Switch to Sign Up */}
            <p className="text-center text-gray-600 text-sm mt-6">
              Don&apos;t have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-[#1B7A53] font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
