import { ShieldCheck, Home, Heart } from "lucide-react";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Verified Properties",
      text: "Every listing undergoes strict verification process",
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Local Experts",
      text: "24/7 support from our neighborhood specialists",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Best Value",
      text: "Price match guarantee on all bookings",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 my-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="relative group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon container with geometric shape */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <div className="p-4 bg-indigo-600 text-white rounded-lg shadow-md rotate-45 transform group-hover:rotate-12 transition-transform duration-300">
                  <div className="-rotate-45">
                    {feature.icon}
                  </div>
                </div>
              </div>

              <div className="pt-16 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Geometric connection lines */}
        <div className="hidden md:block max-w-4xl mx-auto mt-12">
          <div className="relative h-1">
            <div className="absolute left-1/3 right-1/3 h-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
            <div className="absolute left-1/2 top-0 w-px h-16 bg-indigo-200 transform -translate-y-full" />
          </div>
        </div>
      </div>
    </section>
  );
};