/* eslint-disable react/no-unescaped-entities */
const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Header */}
      <header className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
          Terms and Conditions
        </h1>
       
      </header>

      {/* Introduction */}
      <section className="mb-10">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Welcome to EstatePro! These Terms and Conditions ("Terms") govern your use of our real estate platform and services. By accessing or using EstatePro, you agree to be bound by these Terms. If you disagree with any part, you may not access our services.
        </p>
        
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#000000' }}></div>
        </div>
      </section>

      {/* Policy Sections */}
      <div className="space-y-10">
        {[
          {
            title: "Acceptance of Terms",
            content: "By creating an account or using our services, you confirm that you accept these Terms and agree to comply with them. If you're using EstatePro on behalf of an organization, you're binding that organization to these Terms."
          },
          {
            title: "Account Registration",
            content: "You must provide accurate information when creating an account. You're responsible for maintaining account security and all activities under your account. Notify us immediately of any unauthorized use."
          },
          {
            title: "Service Description",
            content: "EstatePro provides a platform connecting buyers, sellers, and real estate professionals. We don't act as a real estate broker or agent unless explicitly stated. Property listings are provided by third parties."
          },
          {
            title: "User Responsibilities",
            content: "You agree to use EstatePro lawfully and ethically. Prohibited activities include: misrepresenting information, harassing others, reverse engineering our systems, or violating intellectual property rights."
          },
          {
            title: "Intellectual Property",
            content: "All content on EstatePro (logos, text, graphics) is our property or licensed to us. You may access and use content for personal purposes only. Commercial use requires written permission."
          },
          {
            title: "Transaction Fees",
            content: "Certain services may involve transaction fees. All fees will be clearly disclosed before you commit to a service. You're responsible for any applicable taxes."
          },
          {
            title: "Limitation of Liability",
            content: "To the maximum extent permitted by law, EstatePro shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services."
          },
          {
            title: "Indemnification",
            content: "You agree to indemnify and hold harmless EstatePro from any claims, damages, or expenses arising from your breach of these Terms or violation of any laws."
          },
          {
            title: "Termination",
            content: "We may terminate or suspend your access immediately for any breach of these Terms. Upon termination, your right to use our services will cease immediately."
          },
          {
            title: "Governing Law",
            content: "These Terms shall be governed by the laws of the State of California without regard to its conflict of law provisions."
          },
          {
            title: "Changes to Terms",
            content: "We reserve the right to modify these Terms at any time. Continued use after changes constitutes acceptance. We'll notify you of significant changes via email or platform notification."
          },
          {
            title: "Contact Information",
            content: "For questions about these Terms, contact us at legal@estatepro.com or EstatePro Legal Department, 123 Realty Blvd, San Francisco, CA 94105"
          }
        ].map((section, index) => (
          <section key={index} className="border-l-4 pl-4 py-1" style={{ borderColor: '#000000' }}>
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#000000' }}>
              {section.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      {/* Agreement Confirmation */}
      <div className="mt-10 p-6 rounded-xl border" style={{ borderColor: '#000000' }}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1 mr-3" style={{ color: '#000000' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            By using EstatePro, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, you should discontinue use of our services immediately.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
              <span className="text-white font-bold text-xl">EP</span>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-600 dark:text-gray-400">
          © 2025 EstatePro. All rights reserved.<br />
          Your trusted partner in real estate transactions.
        </p>
      </div>
    </div>
  );
};

export default page;