"use client";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "@/components/ui/footer";
import LaunchUI from "@/components/logos/launch-ui";
import Link from "next/link";
import { Building, FileText, Home, Info, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { toast } from "sonner";

export default function FooterSection() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed successfully!");
    setEmail("");
  };
  const links = [
    {
      path: "/",
      label: "Home",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      path: "/about",
      label: "About Us",
      icon: <Info className="h-4 w-4 mr-2" />,
    },
    {
      path: "/houses",
      label: "Properties",
      icon: <Building className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <footer className="bg-background w-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(to_right,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Footer className="border-t pt-16 relative">
        <div className="container mx-auto px-4">
          <FooterContent className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <FooterColumn className="space-y-6">
              <Link
                href="/"
                className="flex items-center cursor-pointer gap-2 group"
                prefetch={false}
              >
                <div className="relative">
                  <div
                    className="absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"
                    style={{
                      background: `radial-gradient(circle at center, #181818 0%, rgba(79, 57, 246, 0.1) 70%)`,
                    }}
                  ></div>

                  <div className="relative px-4 py-1 bg-black text-white rounded-full leading-none flex items-center">
                    <Building className="h-5 w-5" />
                    <span className="ml-2 font-bold">EstatePro</span>
                  </div>
                </div>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs">
                Powering seamless rentals for the modern market. EstatePro
                offers intuitive, open-source tools for landlords and tenants.
              </p>
            </FooterColumn>

            <FooterColumn>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Company
              </h3>
              <div className="space-y-3">
                {links.map((link, idx) => (
                  <Link
                    href={link.path}
                    key={idx}
                    className={cn(
                      "flex items-center gap-2 transition-colors py-1",
                      pathname === link.path
                        ? "text-black font-semibold"
                        : "text-gray-600 dark:text-gray-400 hover:text-black"
                    )}
                    prefetch={false}
                  >
                    {React.cloneElement(link.icon, {
                      className: "h-4 w-4",
                      style: {
                        color:
                          pathname === link.path ? "#181818" : "currentColor",
                      },
                    })}
                    {link.label}
                  </Link>
                ))}
              </div>
            </FooterColumn>

            <FooterColumn>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-gray-500"
                >
                  <path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Legal
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Privacy Policy",
                    url: "/privacy",
                    icon: <ShieldCheck className="h-4 w-4 mr-2" />,
                  },
                  {
                    title: "Terms of Service",
                    url: "/terms",
                    icon: <FileText className="h-4 w-4 mr-2" />,
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="text-sm flex items-center transition-colors text-gray-600 dark:text-gray-400 hover:text-black"
                  >
                    <span className="mr-2 text-black">{item.icon}</span>
                    {item.title}
                  </Link>
                ))}
              </div>
            </FooterColumn>

            <FooterColumn>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full cursor-pointer bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </div>
            </FooterColumn>
          </FooterContent>

          <FooterBottom className="border-t mt-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <LaunchUI className="w-4 h-4" />
                <span>© 2025 EstatePro. All rights reserved</span>
              </div>
            </div>
          </FooterBottom>
        </div>
      </Footer>
    </footer>
  );
}
