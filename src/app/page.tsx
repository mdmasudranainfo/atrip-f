import LandingPage from "@/components/landingPage/page";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.description}`,
  description: `${siteConfig.description}`,
};
export default function Home() {
  return (
      <LandingPage />
  );
}
