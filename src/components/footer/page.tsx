"use client";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JoinNewsletterForm } from "./join-newsletter-form";
import { useState, useEffect } from "react";
import { getAllDestinations } from "@/lib/actions/destination-actions";

// Define a type for the payment method object
interface PaymentMethod {
  name: string;
  path: string;
  image?: string; // The `image` field is optional
}
interface LinkItem {
  name: string;
  path: string;
  slug: string;
}

const destinations = [
  // { name: "Refund Policy", path: "/refund-and-cancellation-policy" },
  { name: "Terms And Condition", path: "/terms-and-condition" },
  // { name: "Terms Of Service", path: "/terms-of-service" },
  // { name: "Dispute Resolution Policy", path: "/dispute-resolution-policy" },
  { name: "Privacy Policy", path: "/acceptable-use-policy" },
  // { name: "Blog", path: "/blog" },
  { name: "About Us", path: "/about-us" },
  // { name: "Careers", path: "/careers" },
  { name: "How We Works", path: "/works" },
  { name: "Partners", path: "/partners" },
  { name: "Contact Us", path: "/contact-us" },
];

const paymentMethods: PaymentMethod[] = [
  { name: "", path: "/payment/stripe", image: "/images/paymentCard.png" },
];

const titles = ["Top Destinations", "Discover", "Payment Methods"];

export default function Footer() {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await getAllDestinations();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  const sectionLinks = [
    links,
    destinations.map((dest) => ({ name: dest.name, path: dest.path })),
    paymentMethods,
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-white to-blue-50 font-inter dark:from-slate-950 dark:to-slate-900">
      {/* Wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white dark:fill-slate-950"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-10 sm:pt-24 pb-8">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-5">
            {/* Left section - Logo, social, subscription */}
            <div className="lg:col-span-5 md:space-y-8 space-y-3">
              <div className="space-y-4">
                <Image
                  src="/images/logo/light_logo-preview.png"
                  alt="Site Logo"
                  width={150}
                  height={50}
                  priority
                  className="object-contain"
                />
                <div className="relative">
                  <p className="font-inter text-lg lg:text-xl font-semibold leading-7 tracking-[-0.02em] text-slate-800 dark:text-slate-200">
                    Travel safely everywhere
                  </p>
                  <div className="absolute -bottom-1 left-0 h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                </div>
              </div>

              {/* Social media links */}
              <div className="space-y-4">
                <p className="font-inter text-lg font-semibold leading-7 tracking-[-0.02em] text-slate-800 dark:text-slate-200">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, label: "Facebook" },
                    { icon: Instagram, label: "Instagram" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Youtube, label: "Youtube" },
                    { icon: Linkedin, label: "LinkedIn" },
                  ].map((social, index) => (
                    <Link
                      href="#"
                      key={index}
                      aria-label={social.label}
                      className="group flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-blue-600 hover:shadow-md dark:bg-slate-800"
                    >
                      <social.icon className="h-5 w-5 text-slate-700 transition-all group-hover:text-white dark:text-slate-300" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Subscription card */}
              <div className="relative mt-8">
                <div className="rounded-xl bg-white p-6 m-0 dark:bg-slate-800">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-inter text-lg lg:text-xl font-semibold leading-7 tracking-[-0.02em] text-slate-800 dark:text-slate-200">
                        Get 25% off on your first order
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Subscribe to our newsletter for exclusive deals
                      </p>
                    </div>

                    <JoinNewsletterForm />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full border-4 border-blue-100 dark:border-blue-900/30 hidden md:block"></div>
                <div className="absolute -left-2 -bottom-2 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 hidden md:block"></div>
              </div>
            </div>

            {/* Right section - Links grid */}
            <div className="lg:col-span-7 md:block hidden ">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {titles.map((title, index) => (
                  <div key={index} className="space-y-6">
                    <h3 className="font-inter text-lg lg:text-xl font-semibold leading-7 text-slate-800 after:content-[''] after:block after:w-12 after:h-1 after:bg-blue-600/30 after:rounded-full after:mt-2 dark:text-slate-200">
                      {title}
                    </h3>
                    <ul className="space-y-3">
                      {sectionLinks[index].map((link: PaymentMethod, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          {link.name && (
                            <Link
                              href={
                                title === "Top Destinations"
                                  ? `/destination/${link.path}`
                                  : link.path
                              }
                              className="text-slate-700 hover:text-blue-600 transition-colors relative overflow-hidden group dark:text-slate-300 dark:hover:text-blue-400"
                            >
                              <span>{link.name}</span>
                              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 dark:bg-blue-400"></span>
                            </Link>
                          )}
                          {link.image && (
                            <div className="flex flex-col gap-2 justify-start items-start">
                              <Image
                                src={link.image || "/placeholder.svg"}
                                alt={`Payment method logo`}
                                width={700}
                                height={400}
                                className="object-contain"
                              />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:hidden block mx-auto space-y-8">
          {/* Single Accordion - Only one item open at a time */}
          <div>
            <Accordion type="single" collapsible className="w-full">
              {[1, 2, 3].map((column) => (
                <AccordionItem
                  key={`column-${column}`}
                  value={`item-${column}`}
                  className="mb-3 p-4 bg-white rounded-lg footer-accordion"
                >
                  <AccordionTrigger className="!no-underline font-inter text-md !mb-0 font-semibold leading-5 tracking-[-0.02em] text-dark mt-0 pt-0">
                    {titles[column - 1]} {/* Titles for each column */}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 space-y-2">
                      {/* Render only the content for the specific column */}
                      {sectionLinks[column - 1].map(
                        (link: PaymentMethod, idx) => (
                          <div key={idx} className="space-y-6">
                            <ul className="space-y-3">
                              <li>
                                {link.name && (
                                  <Link
                                    href={link.path}
                                    className="text-slate-700 hover:text-blue-600 transition-colors relative overflow-hidden group dark:text-slate-300 dark:hover:text-blue-400"
                                  >
                                    <span>{link.name}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 dark:bg-blue-400"></span>
                                  </Link>
                                )}
                                {link.image && (
                                  <div className="transition-transform hover:scale-105">
                                    <Image
                                      src={link.image || "/placeholder.svg"}
                                      alt={`Payment method logo`}
                                      width={150}
                                      height={30}
                                      className="object-contain"
                                    />
                                  </div>
                                )}
                              </li>
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} atrip.ae All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
