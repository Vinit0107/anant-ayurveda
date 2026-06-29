'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import aboutData from '@/data/about.json';
import { AboutData } from '@/types';

const data = aboutData as AboutData;

/**
 * About section with image, stats overlay, heading, paragraphs, and badges.
 * Two-column layout, scroll-triggered animations.
 */
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="bg-[#0C0C0C] py-16 lg:py-24">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image with stats overlay */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={data.image}
                alt="Yoga at sunset - Anant Ayurveda wellness"
                width={540}
                height={400}
                className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover rounded-xl"
                priority
              />
            </div>

            {/* Stats overlay card */}
            <motion.div
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#1B7A53] rounded-xl px-6 py-5 sm:px-8 sm:py-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-white">
                {data.stats.value}
              </p>
              <p className="text-[10px] sm:text-xs tracking-wider text-white/80 uppercase mt-1">
                {data.stats.label}
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-white">
              {data.heading}
            </h2>

            {data.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-400 text-sm sm:text-base leading-relaxed mt-6"
              >
                {paragraph}
              </p>
            ))}

            {/* Badges */}
            <div className="flex flex-wrap gap-8 mt-8">
              {data.badges.map((badge) => (
                <div key={badge.id} className="flex items-start gap-3">
                  <CheckCircle
                    size={22}
                    className="text-[#1B7A53] mt-0.5 flex-shrink-0"
                    fill="#1B7A53"
                    stroke="#0C0C0C"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      {badge.title}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {badge.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
