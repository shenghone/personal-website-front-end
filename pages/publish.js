import React, { useState } from "react";
import MyName from "../components/MyName";
import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";
import Head from "next/head";
import Layout from "../components/Layout";
import BlogEditor from "../components/BlogEditor";

function publish(props) {
  return (
    <Layout>
      <BlogEditor />
    </Layout>
  );
}

export default publish;
