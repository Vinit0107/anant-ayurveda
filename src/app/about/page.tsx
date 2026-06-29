'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignUpModal';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [cartCount] = useState(4);

  const openLogin = () => { setIsSignUpOpen(false); setIsLoginOpen(true); };
  const openSignUp = () => { setIsLoginOpen(false); setIsSignUpOpen(true); };
  const closeModals = () => { setIsLoginOpen(false); setIsSignUpOpen(false); };

  return (
    <main className="bg-[#0C0C0C] min-h-screen text-white">
      <Navbar onLoginClick={openLogin} cartCount={cartCount} />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-[#1B7A53] text-sm tracking-[0.3em] uppercase mb-4">OUR STORY</p>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-6">
              The Heritage of <span className="italic text-[#5a7a62]/80">Anant Ayurveda</span>
            </h1>
            <p className="text-gray-400 leading-relaxed text-lg">
              Founded in the historic city of Bhavnagar, Gujarat, Anant Naturals (Kutir Udyog) was born out of a profound respect for ancient Indian wisdom and a desire to bring pure, unadulterated Ayurvedic wellness to the modern world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-16 lg:py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-semibold mb-6">Our Philosophy</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  At Anant Ayurveda, we believe that nature holds the blueprint for perfect health. Our name "Anant" translates to "Endless" or "Infinite" – representing the boundless healing potential of Mother Earth.
                </p>
                <p>
                  Every product we create is a testament to the 5,000-year-old Vedic scriptures. We do not simply manufacture skincare and wellness products; we craft holistic remedies that restore the crucial balance between the Mind, Body, and Spirit (Dosha harmony).
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 text-center">
                <div className="text-[#1B7A53] text-4xl mb-4">🌿</div>
                <h3 className="text-white font-semibold mb-2">100% Pure</h3>
                <p className="text-xs text-gray-500">Ethically sourced natural herbs</p>
              </div>
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 text-center">
                <div className="text-[#1B7A53] text-4xl mb-4">🏺</div>
                <h3 className="text-white font-semibold mb-2">Cold Pressed</h3>
                <p className="text-xs text-gray-500">Traditional extraction methods</p>
              </div>
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 text-center">
                <div className="text-[#1B7A53] text-4xl mb-4">⚕️</div>
                <h3 className="text-white font-semibold mb-2">Vedic Science</h3>
                <p className="text-xs text-gray-500">Formulated by Ayurvedic experts</p>
              </div>
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 text-center">
                <div className="text-[#1B7A53] text-4xl mb-4">🌍</div>
                <h3 className="text-white font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-xs text-gray-500">Sustainable Kutir Udyog practices</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Approach */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="font-playfair text-3xl sm:text-4xl font-semibold mb-6">Purity in Every Drop</h2>
            <div className="w-16 h-1 bg-[#1B7A53] mx-auto rounded-full mb-8" />
            <p className="text-gray-400 text-lg">
              Our signature Aloe Vera Gels and Hair Growth formulations are created in small batches. This "Kutir Udyog" (cottage industry) approach allows us to maintain strict quality control and preserve the delicate "Prana" (life force) of the botanical ingredients. We proudly stand against harsh chemicals, parabens, and synthetic fragrances.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={closeModals} onSwitchToSignUp={openSignUp} />
      <SignUpModal isOpen={isSignUpOpen} onClose={closeModals} onSwitchToLogin={openLogin} />
    </main>
  );
}
