// app/about/page.tsx
import { BadgeCheck, HeartHandshake, LandPlot, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen my-10">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/cover.webp"
            alt="About Us"
            fill
            className="object-cover rounded-t-4xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r rounded-t-4xl  from-blue-900/80 to-blue-600/80" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Finding Your Perfect Space</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Connecting people with their ideal homes since 2015
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                What started as a small team of real estate enthusiasts has grown into a trusted
                platform helping thousands find their perfect home every month. We combine 
                cutting-edge technology with human expertise to simplify your home search.
              </p>
              <div className="flex items-center space-x-4">
                <BadgeCheck className="h-12 w-12 text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold">Trusted by 500,000+ Users</h3>
                  <p className="text-gray-600">4.9/5 average rating across platforms</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/team.jpg" 
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-blue-900 text-white py-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-3">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-4">Start your journey with us today</p>
          <Link
            href="/houses"
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Browse Listings
          </Link>
        </div>
      </section>
    </div>
  );
}

const values = [
  {
    icon: HeartHandshake,
    title: "Client First",
    description: "We prioritize your needs and work tirelessly to match you with the perfect property."
  },
  {
    icon: LandPlot,
    title: "Local Expertise",
    description: "Deep knowledge of local markets ensures you get the best value and location."
  },
  {
    icon: ScrollText,
    title: "Transparent Process",
    description: "Clear communication and honest advice throughout your home search journey."
  },
];

