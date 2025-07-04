"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import {
  LogOut,
  Home,
  Info,
  Building,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { logout } from "@/services/AuthServices";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import { IUser } from "@/types/user";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Navbar({ user }: { user: IUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { isLoading, setIsLoading, user: contextUser } = useUser();

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
    {
      path: "/privacy",
      label: "Privacy & Policy",
      icon: <ShieldCheck className="h-4 w-4 mr-2" />,
    },
    {
      path: "/terms",
      label: "Terms & Conditions",
      icon: <FileText className="h-4 w-4 mr-2" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  if (isLoading) {
    return <div className="h-16"></div>;
  }

  return (
    <header className="fixed top-4  left-0 right-0 z-50 px-4">
      <div
        className={cn(
          "container mx-auto rounded-full transition-all duration-300 border",
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-background/50",
          "flex h-16 items-center justify-between px-6"
        )}
      >
        <Link
          href="/"
          className="flex items-center cursor-pointer gap-2 group"
          prefetch={false}
        >
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"
              style={{
                background: `radial-gradient(circle at center, #181818  0%, rgba(79, 57, 246, 0.1) 70%)`,
              }}
            ></div>

            <div className="relative px-4 py-1 bg-black text-white rounded-full leading-none flex items-center">
              <Building className="h-5 w-5" />
              <span className="ml-2 font-bold">EstatePro</span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {links.map((link, idx) => (
            <Link
              href={link.path}
              key={idx}
              className={cn(
                "flex items-center px-4 py-2 rounded-full transition-all",
                pathname === link.path
                  ? "bg-gradient-to-r from-purple-50 to-gray-300 dark:from-purple-900/30 dark:to-black text-primary font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground hover:text-foreground"
              )}
              prefetch={false}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {contextUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full cursor-pointer"
                >
                  <Avatar className="h-8 w-8">
                    {user?.image ? (
                      <AvatarImage src={user?.image} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-r from-gray-500 to-gray-900 text-white cursor-pointer">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="max-w-40 mt-2"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/${user?.role}/dashboard`}
                    className="w-full cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="w-full cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer px-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full cursor-pointer px-4 bg-black text-white">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <div className="flex flex-col gap-6 mt-8">
                {links.map((link, idx) => (
                  <Link
                    href={link.path}
                    key={idx}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-full transition-all",
                      pathname === link.path
                        ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-primary font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground hover:text-foreground"
                    )}
                    prefetch={false}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                {!contextUser && (
                  <div className="md:hidden">
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="rounded-full cursor-pointer px-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="rounded-full cursor-pointer px-4 bg-black text-white">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
