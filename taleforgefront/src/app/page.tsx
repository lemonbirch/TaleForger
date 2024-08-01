import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import FeatureGrid from "./components/FeatureGrid";
import AboutUs from "./components/AboutUs";
import TestimonialCarasousel from "./components/TestimonialCarasousel";
import ContactInfo from "./components/ContactInfo";
import React from "react";
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-base-100 to-base-200">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Add padding-top to push content below navbar */}
        <header className="text-center mb-16 pt-24">
          <h1 className="text-5xl font-bold mb-4">Welcome to StoryBuilder for Kids!</h1>
          <p className="text-2xl font-semibold text-primary">Create Your Own Magical Storybook</p>
        </header>

        {/* Wrap each section in a container with background and margin */}
        <HeroSection />

        <HowItWorks />

        <FeatureGrid />
        
        <AboutUs />
        <TestimonialCarasousel/>

        <ContactInfo/>

        
      </div>
    </main>
  );
}