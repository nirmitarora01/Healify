import React from "react";
import Navbar from "./NavBar";
import Hero from "./Hero";
import FeaturedDoctors from "./FeaturedDoctors";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedDoctors />
      <Footer />
    </>
  );
};

export default Home;
