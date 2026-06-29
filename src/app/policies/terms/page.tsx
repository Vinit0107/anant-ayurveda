export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-invert prose-green">
        <h1 className="text-3xl md:text-5xl font-playfair font-bold text-[#1B7A53] mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: June 2026</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using Anant Ayurveda, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Products and Services</h2>
            <p>Our Ayurvedic products are intended for personal use only. We reserve the right, but are not obligated, to limit the sales of our products to any person or geographic region. All descriptions of products or product pricing are subject to change at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Medical Disclaimer</h2>
            <p>The information provided on this website is for educational purposes only and is not intended to substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition or the use of Ayurvedic products.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Payments</h2>
            <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. We process payments securely via Razorpay. We reserve the right to refuse any order you place with us.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
