'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignUpModal';
import CartDrawer from '@/components/CartDrawer';
import { useCartStore } from '@/store/useCartStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Main page component.
 * Composes all sections and manages modal state for login/signup.
 */
export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount] = useState(4);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const { items, getCartTotal, clearCart } = useCartStore();
  const { data: session } = useSession();

  /** Open login modal */
  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  /** Open signup modal */
  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  /** Close all modals */
  const closeModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  const router = useRouter();

  const handleCheckout = async () => {
    if (!session) {
      alert('Please sign in to complete your purchase.');
      setIsCartOpen(false);
      openLogin();
      return;
    }

    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <main>
      {/* Navigation */}
      <Navbar onLoginClick={openLogin} onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Products Section */}
      <Products />

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        onSwitchToSignUp={openSignUp}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={closeModals}
        onSwitchToLogin={openLogin}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout} 
      />
    </main>
  );
}
