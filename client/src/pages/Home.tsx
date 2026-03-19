/**
 * Marshall Wilkinson Link-in-Bio — "Midnight Ember" Cinematic Dark Premium
 * 
 * Design: Deep navy-black (#08090D) background, warm copper/amber (#D4915C) accents,
 * cream text (#EDE6DB), cinematic depth with parallax, frosted glass cards,
 * ambient glow effects, Sora + DM Sans typography.
 */

import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { AmbientBackground } from "@/components/AmbientBackground";
import { GradientBar } from "@/components/GradientBar";
import { SocialLinks } from "@/components/SocialLinks";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/marshall_hero_6c478c8c.webp";

const products = [
  {
    title: "ALP Handbook",
    price: "$47",
    description: "The interactive contractor's playbook",
    link: "https://alphandbook.com",
    icon: "book" as const,
    iconImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/card_icon_handbook-2LWAbWdb6BXBzBEsZgMuZL.webp",
  },
  {
    title: "ALP Sales Training",
    price: "$297",
    description: "Master the art of closing",
    link: "https://alpsalestraining.com",
    icon: "target" as const,
    iconImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/card_icon_training-Vq6uRYQ3JHcnEERpwNTot3.webp",
  },
  {
    title: "ALP Classes",
    price: "$497/mo",
    description: "Power Hour | Contractor School | Sales & Marketing School",
    link: "https://altitudelogicpressure.com",
    icon: "graduation" as const,
    iconImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/card_icon_classes-iwNHtAUfyVJybqsSnMeRms.webp",
  },
  {
    title: "The Contracting Circle",
    price: "$497/mo",
    description: "Elite contractor community & execution engine",
    link: "/circle",
    icon: "circle" as const,
  },
  {
    title: "ALP Contracting Templates",
    price: "",
    description: "Battle-tested docs & spreadsheets",
    link: "#",
    icon: "file" as const,
    comingSoon: true,
  },
  {
    title: "ALP Private Advisory",
    price: "",
    description: "Fully confidential 1-on-1 strategic consulting with Marshall",
    link: "https://altitudelogicpressure.com",
    icon: "diamond" as const,
    iconImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/card_icon_advisory-F95cG7yKhuZ2ETbBtKcwe9.webp",
    badge: "Apply",
    isApplication: true,
  },
];

const freeResources = [
  {
    title: "15 Strategic Sales Questions",
    price: "FREE",
    description: "The discovery framework for closing high-ticket outdoor living projects",
    link: "https://alpsalestraining.com/fifteenquestions",
    icon: "download" as const,
    badge: "Free",
    isFree: true,
  },
  {
    title: "5 Closing Mistakes Costing You $100K+",
    price: "FREE",
    description: "The sales errors killing your close rate — and how to fix them",
    link: "#",
    icon: "chart" as const,
    badge: "Free",
    isFree: true,
    comingSoon: true,
  },
  {
    title: "The Contractor's Scaling Checklist",
    price: "FREE",
    description: "Systems, hiring & margins — the ops playbook for growth",
    link: "#",
    icon: "clipboard" as const,
    badge: "Free",
    isFree: true,
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden no-scrollbar grain-overlay">
      {/* Animated gradient bar at very top */}
      <GradientBar />

      {/* Ambient floating glow background */}
      <AmbientBackground />

      {/* Hero Section */}
      <HeroSection heroImage={HERO_IMAGE} />

      {/* Section Divider */}
      <SectionDivider />

      {/* Products Section */}
      <section className="relative z-10 px-4 sm:px-6 pb-6 pt-4">
        <div className="max-w-md mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-ember mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              Programs & Resources
            </p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-ember to-transparent mx-auto" />
          </motion.div>

          {/* Product Cards */}
          <div className="flex flex-col gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.title}
                {...product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="relative z-10 px-4 sm:px-6 pb-8 pt-2">
        <div className="max-w-md mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-ember mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              Free Resources
            </p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-ember to-transparent mx-auto" />
          </motion.div>

          {/* Free Resource Cards */}
          <div className="flex flex-col gap-4">
            {freeResources.map((resource, index) => (
              <ProductCard
                key={resource.title}
                {...resource}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <SocialLinks />

      {/* Footer */}
      <Footer />
    </div>
  );
}
