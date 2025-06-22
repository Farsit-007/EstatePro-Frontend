/* eslint-disable react/no-unescaped-entities */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - EstatePro",
  description: "User-friendly rental platform connecting tenants and landlords. Browse properties, pay securely via ShurjoPay. Manage listings, payments, and interactions efficiently.",
};

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Header */}
      <header className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
          Privacy Policy
        </h1>
        
      </header>

      {/* Introduction */}
      <section className="mb-10">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          EstatePro ("we", "us", or "our") operates the EstatePro platform and related services. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
          when you use our real estate services.
        </p>
        
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#000000' }}></div>
        </div>
      </section>

      {/* Policy Sections */}
      <div className="space-y-10">
        {[
          {
            title: "Information We Collect",
            content: "We collect personal information you provide directly, such as name, email, phone number, and property preferences. We also automatically collect usage data through cookies and similar technologies."
          },
          {
            title: "How We Use Your Information",
            content: "Your information helps us provide and improve our services, personalize your experience, communicate with you about properties, process transactions, and ensure platform security."
          },
          {
            title: "Information Sharing",
            content: "We may share information with real estate agents, service providers, and when required by law. We never sell your personal information to third parties for marketing purposes."
          },
          {
            title: "Data Security",
            content: "We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your personal information."
          },
          {
            title: "Your Choices",
            content: "You can manage your communication preferences in your account settings. Most browsers allow you to control cookies through their settings."
          },
          {
            title: "Children's Privacy",
            content: "Our services are not directed to individuals under 18. We do not knowingly collect personal information from children."
          },
          {
            title: "Changes to This Policy",
            content: "We may update this policy periodically. We'll notify you of significant changes through our platform or via email."
          },
          {
            title: "Contact Us",
            content: "For privacy-related questions, contact our Data Protection Officer at privacy@estatepro.com"
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
          Making real estate transactions simple and secure.
        </p>
      </div>
    </div>
  );
};

export default page;