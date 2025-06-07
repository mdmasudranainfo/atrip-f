"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  User,
  LogOut,
  ChevronRight,
  CalendarCheck,
  Key,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import FlightSearchModal from "@/components/modals/FlightSearchModal";
import { FaWhatsapp } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { userLogout } from "@/lib/actions/auth";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { removeSessionData } from "@/utils/sessionCache";

interface NavLinkProps {
  href: string;
  children: string;
  isActive?: boolean;
  selectedMenu?: string;
  isBgWhite?: boolean;
}

interface MenuLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function TransparentNavbar({
  isBgWhite = false,
}: {
  isBgWhite: boolean;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  function MenuLink({ href, icon, label }: MenuLinkProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsLoading(true);
      router.push(href);
    };

    return (
      <DropdownMenuItem
        asChild
        className="p-0 focus:bg-transparent focus:text-foreground"
      >
        <Link
          href={href}
          onClick={handleClick}
          className="group flex w-full items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-primary/10"
        >
          <div className="flex items-center gap-2 ">
            <span className="text-muted-foreground group-hover:text-primary">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
            </span>
            <span className="font-semibold">
              {isLoading ? "Loading..." : label}
            </span>
          </div>
          {!isLoading && (
            <ChevronRight
              size={16}
              className="text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary"
            />
          )}
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <header className="bg-about-us w-full py-4 relative z-10">
      <div
        className={`${
          isBgWhite ? "bg-white" : "bg-[#00000066]"
        } h-full w-full absolute top-0 bottom-0`}
      ></div>
      <div className="container main-nav-container mx-auto md:px-0 px-2 gap-8 flex  items-center relative justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            {/* {icons.faisalLogo} */}
            <Image
              src={
                isBgWhite
                  ? "/images/logo/light_logo-preview.png"
                  : "/images/logo/dark_logo-preview.png"
              }
              alt="Site Logo"
              width={150}
              height={50}
              priority
              className="object-contain site-logo"
            />
          </Link>
        </div>

        {/* Center - Navigation */}
        <nav className="lg:flex text-black hidden items-center lg:space-x-0 lg:gap-3 xl:space-x-0 2xl:space-x-7">
          <span onClick={() => removeSessionData("activitiesData")}>
            <NavLink
              isBgWhite={isBgWhite}
              href="/activities"
              isActive={pathname.startsWith("/activities")}
            >
              Attractions
            </NavLink>
          </span>

          <span onClick={() => removeSessionData("transportData")}>
            <NavLink
              isBgWhite={isBgWhite}
              href="/transports"
              isActive={pathname.startsWith("/transports")}
            >
              Transport
            </NavLink>
          </span>

          {/* <NavLink
            isBgWhite={isBgWhite}
            href="/tour"
            isActive={pathname.startsWith("/tour")}
          >
            Holiday
          </NavLink>
          <NavLink
            isBgWhite={isBgWhite}
            href="/visa"
            isActive={pathname.startsWith("/visa")}
          >
            Visa
          </NavLink>
          <NavLink
            isBgWhite={isBgWhite}
            href="/cars"
            isActive={pathname.startsWith("/cars")}
          >
            Cars Rental
          </NavLink>
          <NavLink
            isBgWhite={isBgWhite}
            href="/umrah"
            isActive={pathname.startsWith("/umrah")}
          >
            Umrah
          </NavLink>
          <NavLink
            isBgWhite={isBgWhite}
            href="/chauffeur-with-car"
            isActive={pathname.startsWith("/chauffeur-with-car")}
          >
            Car+Driver
          </NavLink>
          <NavLink
            isBgWhite={isBgWhite}
            href="/hotels"
            isActive={pathname.startsWith("/hotels")}
          >
            Hotel
          </NavLink> */}

          {/* <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className={`${
                    isBgWhite
                      ? "text-primary-dark hover:text-primary-dark/90"
                      : "text-white hover:text-white"
                  } text-md font-bold hover:bg-transparent  cursor-pointer flex items-center nav-font`}
                >
                  More
                  <ChevronDown className="ml-1 h-5 w-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuItem>
                  <Link href="/a2a-visa" className="w-full">
                    <span className="font-semibold text-base pl-0 text-primary-dark">
                      A2A Visa
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/chauffeur" className="w-full">
                    <span className="font-semibold text-base pl-0 text-primary-dark">
                      Chauffeur
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link
                    href="/flight"
                    className={`w-full font-semibold text-base pl-0 text-primary-dark ${
                      pathname === "/flight" ? "text-blue-600" : ""
                    }`}
                  >
                    <span className="font-semibold text-base pl-0 text-primary-dark">
                      Flight
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </nav>

        {/* Right - Buttons */}
        <div className="header-buttons flex-shrink-0 lg:flex  hidden items-center space-x-4">
          {/* WhatsApp Button */}
          {/* {!!siteConfig.whatsAppId && (
            <Link
              href={`https://wa.me/${siteConfig.whatsAppId}`}
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-2 py-2 rounded-sm flex items-center space-x-2"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </Link>
          )} */}
          {session?.user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <Avatar className="h-10 w-10 border-2 border-primary/10 transition-all duration-300 hover:border-primary/30">
                    {/* Remove AvatarImage to force fallback display */}
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground">
                      {session.user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-72 overflow-hidden rounded-xl p-0 shadow-lg"
              >
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-background/80">
                      {/* Remove AvatarImage here too */}
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground">
                        {session.user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-0 pt-1">
                  <MenuLink
                    href="/profile"
                    icon={<User size={18} />}
                    label="Profile"
                  />
                  <MenuLink
                    href="/my-bookings"
                    icon={<CalendarCheck size={18} />}
                    label="My Bookings"
                  />
                  <MenuLink
                    href="/chnage-password"
                    icon={<Key size={18} />}
                    label="Change Password"
                  />
                </div>

                <DropdownMenuSeparator />

                <div className="px-2 pb-2">
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => {
                      signOut();
                      userLogout();
                    }}
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="outline"
                className=" text-blue-600 !border font-bold bg-white px-6 py-5"
              >
                Log in / Register
              </Button>
            </Link>
          )}
        </div>

        <div className="lg:hidden block">
          {/* Icon to open the drawer */}
          <div className="flex justify-center items-center gap-1">
            {session?.user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-[35px] w-[35px] rounded-full p-0"
                  >
                    <Avatar className="h-[35px] w-[35px] border-2 border-primary/10 transition-all duration-300 hover:border-primary/30">
                      {/* Remove AvatarImage to force fallback display */}
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground">
                        {session.user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-72 overflow-hidden rounded-xl p-0 shadow-lg"
                >
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/10 transition-all duration-300 hover:border-primary/30">
                        {/* Remove AvatarImage to force fallback display */}
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground">
                          {session.user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-0 pt-1">
                    <MenuLink
                      href="/profile"
                      icon={<User size={18} />}
                      label="Profile"
                    />
                    <MenuLink
                      href="/my-bookings"
                      icon={<CalendarCheck size={18} />}
                      label="My Bookings"
                    />
                    <MenuLink
                      href="/change-password"
                      icon={<Key size={18} />}
                      label="Change Password"
                    />
                  </div>

                  <DropdownMenuSeparator />

                  <div className="px-2 pb-2">
                    <DropdownMenuItem
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                      onClick={() => {
                        signOut();
                        userLogout();
                      }}
                    >
                      <LogOut size={18} />
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <User size={23} className="text-white" />
              </Link>
            )}

            <Button
              onClick={toggleDrawer}
              className={`text-2xl p-2 pr-0 !bg-transparent rounded-full shadow-none hover:bg-transparent ${
                isBgWhite ? "text-dark" : "text-white"
              }  focus:outline-none`}
            >
              ☰
            </Button>
          </div>

          {/* Drawer content */}
          <div
            className={`canvas-menu-wrapper fixed !z-10 top-0 right-0 w-[60%]  h-full ${
              isBgWhite
                ? "bg-white text-primary-dark"
                : "bg-gray-800 text-white"
            }   p-6 transition-transform transform ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Button
              onClick={toggleDrawer}
              className="canvas-close absolute top-4 h-10 w-10 left-4 mb-2 text-white text-2xl"
            >
              X
            </Button>

            <div className="mt-10">
              {/* Center - Navigation */}
              <nav className="main-nav transparent-nav flex flex-col mb-5">
                <span onClick={() => removeSessionData("activitiesData")}>
                  <NavLink
                    isBgWhite={isBgWhite}
                    href="/activities"
                    isActive={pathname.startsWith("/activities")}
                  >
                    Attractions
                  </NavLink>
                </span>

                <span onClick={() => removeSessionData("transportData")}>
                  <NavLink
                    isBgWhite={isBgWhite}
                    href="/transports"
                    isActive={pathname.startsWith("/transports")}
                  >
                    Transport
                  </NavLink>
                </span>

                {/*  */}
                {/* <NavLink
                  isBgWhite={isBgWhite}
                  href="/tour"
                  isActive={pathname === "/tour"}
                >
                  Holiday
                </NavLink>
                <NavLink
                  isBgWhite={isBgWhite}
                  href="/visa"
                  isActive={pathname === "/visa"}
                >
                  Visa
                </NavLink>
                <NavLink
                  isBgWhite={isBgWhite}
                  href="/cars"
                  isActive={pathname === "/cars"}
                >
                  Cars Rental
                </NavLink>
                <NavLink
                  isBgWhite={isBgWhite}
                  href="/umrah"
                  isActive={pathname === "/umrah"}
                >
                  Umrah
                </NavLink>
                <NavLink
                  isBgWhite={isBgWhite}
                  href="/chauffeur-with-car"
                  isActive={pathname === "/chauffeur-with-car"}
                >
                  Car With Driver
                </NavLink>
                <NavLink
                  isBgWhite={isBgWhite}
                  href="/hotels"
                  isActive={pathname === "/hotels"}
                >
                  Hotel
                </NavLink>

                <NavLink
                  isBgWhite={isBgWhite}
                  href="/a2a-visa"
                  isActive={pathname === "/a2a-visa"}
                >
                  A2A Visa
                </NavLink>
                <NavLink
                  isBgWhite={isBgWhite}
                  href="/chauffeur"
                  isActive={pathname === "/chauffeur"}
                >
                  Chauffeur
                </NavLink>
                <NavLink
                  isBgWhite={isBgWhite}
                  href="/flight"
                  isActive={pathname === "/flight"}
                >
                  Flights
                </NavLink> */}
              </nav>

              {/* Right - Buttons */}
              <div className="flex-shrink-0 flex items-center gap-5 ">
                {!!siteConfig.whatsAppId && (
                  <Link
                    href={`https://wa.me/${siteConfig.whatsAppId}`}
                    target="_blank"
                    className="wtsap-btn  bg-success hover:bg-success/90 text-white shadow font-bold px-2 py-[10px] rounded-sm flex items-center gap-1"
                  >
                    <FaWhatsapp size={18} />
                    WhatsApp
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FlightSearchModal open={open} onOpenChange={setOpen} />
    </header>
  );
}

function NavLink({ href, children, isActive, isBgWhite }: NavLinkProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        `relative px-1 py-2 text-md font-bold ${
          isBgWhite
            ? "text-primary-dark hover:text-primary-dark/90"
            : "text-gray-200 hover:text-white"
        } transition-colors flex items-center gap-2`,
        isActive &&
          "active-menu text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white"
      )}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Link>
  );
}
