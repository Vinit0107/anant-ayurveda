'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import productsData from '@/data/products.json';
import { Product } from '@/types';

import { useCartStore } from '@/store/useCartStore';

const products = productsData as Product[];

/**
 * Products section displaying product cards in a responsive grid.
 * Scroll-triggered staggered animations.
 */
export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    // Optional: show a toast notification here
  };

  return (
    <section id="products" className="bg-[#0C0C0C] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair italic text-3xl sm:text-4xl lg:text-5xl text-white">
            Our Top Products
          </h2>
          {/* Green underline */}
          <div className="w-16 h-1 bg-[#1B7A53] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Product cards grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Image area */}
              <div className="relative bg-[#f5f5f5] h-[250px] sm:h-[280px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Badge */}
                <span
                  className="absolute top-4 right-4 text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: product.badgeColor }}
                >
                  {product.badge}
                </span>
              </div>

              {/* Card content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between mt-5">
                  <p className="text-white text-xl font-bold">
                    ₹{product.price}
                  </p>
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    className="border border-white/30 text-white text-[11px] uppercase tracking-wider px-4 py-2 rounded hover:bg-white/10 transition-colors duration-300 cursor-pointer z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ADD TO CART
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
