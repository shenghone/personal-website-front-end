import React, { useState } from "react";
import MyName from "../components/MyName";
import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";
import Head from "next/head";
import Layout from "../components/Layout";
import BlogEditor from "../components/BlogEditor";
/*const BlogEditor = dynamic(() => import("../components/BlogEditor"), {
  ssr: false
});*/

function publish(props) {
  return (
    <Layout>
      <BlogEditor />
    </Layout>
  );
}

export default publish;
