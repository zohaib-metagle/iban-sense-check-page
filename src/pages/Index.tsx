
import IbanValidator from "@/components/IbanValidator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="py-6 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">IBAN Sense Check</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Validate Your International Bank Account Number
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Quick, free, and secure IBAN validation to ensure your banking details are correct
          </p>
          
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700">
              <span>No registration required</span>
            </div>
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700">
              <span>Data never stored</span>
            </div>
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700">
              <span>Instant verification</span>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <IbanValidator />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why validate your IBAN?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Avoid failed payments and transaction fees</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Ensure your money reaches the correct account</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Verify the bank country and check digits</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                  <span>Prevent delays in payment processing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="mb-2">IBAN Sense Check — A reliable IBAN validation tool</p>
          <p className="text-sm">This tool is provided for informational purposes. While we strive for accuracy, we recommend double-checking with your bank for official verification.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
