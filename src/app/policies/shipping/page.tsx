export default function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-invert prose-green">
        <h1 className="text-3xl md:text-5xl font-playfair font-bold text-[#1B7A53] mb-8">Shipping Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: June 2026</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Order Processing Time</h2>
            <p>All orders placed on Anant Ayurveda are processed within 1-2 business days. Orders are not shipped or delivered on Sundays or local public holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Shipping Rates & Delivery Estimates</h2>
            <p>We offer standard shipping across India. Shipping charges for your order will be calculated and displayed at checkout.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Standard Delivery:</strong> 3-5 business days.</li>
              <li><strong>Express Delivery:</strong> 1-2 business days (available in select PIN codes).</li>
            </ul>
            <p className="mt-2">Delivery delays can occasionally occur due to unforeseen circumstances or bad weather.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Shipment Confirmation & Order Tracking</h2>
            <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours. You can also view this in the "My Orders" section of your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Damages</h2>
            <p>Anant Ayurveda is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
