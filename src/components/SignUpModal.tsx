'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

/**
 * Sign up modal with registration form.
 * White modal on dark overlay with smooth animations.
 */
export default function SignUpModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: SignUpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      // Success
      alert("Account created successfully! Please sign in.");
      
      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Switch to login
      onSwitchToLogin();
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
            className="relative bg-white rounded-xl w-full max-w-md p-8 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
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
              Create Account
            </h2>
            <p className="text-gray-500 text-sm text-center mt-2">
              Join us and explore Ayurvedic wellness
            </p>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 tracking-wider uppercase mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-gray-100 text-gray-900 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7A53] placeholder:text-gray-400"
                  required
                />
              </div>

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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 tracking-wider uppercase mb-2">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-100 text-gray-900 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7A53] placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Sign Up button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1B4D3E] text-white py-3 rounded-lg uppercase text-sm tracking-wider font-semibold hover:bg-[#163D32] transition-colors disabled:opacity-70"
                whileHover={isLoading ? {} : { scale: 1.02 }}
                whileTap={isLoading ? {} : { scale: 0.98 }}
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
              </motion.button>
            </form>

            {/* Switch to Login */}
            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-[#1B7A53] font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
