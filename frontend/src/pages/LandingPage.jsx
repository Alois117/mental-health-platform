import React from "react";
import Header from "../components/Header";
import Homebody from "../components/Homebody";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import BlogSection from "../components/BlogSection";
import ContactUs from "../components/ContactUs";
import MentalHealthBanner from "../components/MentalHealthBanner";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Homebody />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <ContactUs />
      <MentalHealthBanner />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default LandingPage;
