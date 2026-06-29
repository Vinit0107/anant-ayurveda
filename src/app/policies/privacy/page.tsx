export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-invert prose-green">
        <h1 className="text-3xl md:text-5xl font-playfair font-bold text-[#1B7A53] mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: June 2026</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This includes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Name and contact data (Email address, Phone number)</li>
              <li>Shipping and billing address</li>
              <li>Payment information (processed securely by Razorpay)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Process your transactions and deliver your orders</li>
              <li>Send you order confirmations and tracking updates</li>
              <li>Communicate with you about products, services, and promotional offers</li>
              <li>Protect against fraudulent transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
            <p>We have implemented strict security measures to protect your personal data. We use HTTPS encryption across our entire website. All payment transactions are processed through Razorpay's PCI-DSS compliant gateway and your raw credit card data never touches our servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
            <p>We may share your data with trusted third parties to facilitate our services, such as shipping carriers (to deliver your products) and payment processors (to handle your transactions securely).</p>
          </section>
        </div>
      </div>
    </main>
  );
}
