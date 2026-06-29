export default function ReturnsPolicy() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-invert prose-green">
        <h1 className="text-3xl md:text-5xl font-playfair font-bold text-[#1B7A53] mb-8">Returns & Exchanges</h1>
        <p className="text-gray-400 mb-8">Last updated: June 2026</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Return Window</h2>
            <p>We accept returns within <strong>7 days</strong> of the delivery date. To be eligible for a return, your Ayurvedic product must be unused, sealed, and in the exact same condition that you received it. It must also be in the original packaging.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Non-Returnable Items</h2>
            <p>Due to hygiene and safety reasons, the following items cannot be returned:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Opened or unsealed skincare products</li>
              <li>Consumable Ayurvedic supplements that have been opened</li>
              <li>Gift cards or promotional items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Refund Process</h2>
            <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-7 business days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Exchanges</h2>
            <p>We only replace items if they are defective or damaged upon arrival. If you need to exchange it for the same item, send us an email at our support address and send your item to our facility.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
