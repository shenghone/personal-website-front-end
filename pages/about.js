import React from "react";
import AboutContent from "../components/AboutContent";
import Layout from "../components/Layout";

const About = React.memo(function () {
  return (
    <Layout>
      <AboutContent />
    </Layout>
  );
});

export default About;
