import React from "react";
import Link from "next/link";
import MyName from "../components/MyName";
import Navbar from "../components/Navbar";
import AboutContent from "../components/AboutContent";
import Layout from "../components/Layout";

const About = React.memo(function() {
  return (
    <Layout>
      <AboutContent />
    </Layout>
  );
});

export default About;
