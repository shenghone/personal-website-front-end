import React from "react";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ArticleBody from "../components/ArticleBody";

function article(props) {
  console.log(props);
  return (
    <Layout>
      <ArticleBody articleId={props.id} />
    </Layout>
  );
}

article.getInitialProps = async ({ req, query: { id } }) => {
  return {
    id: id
  };
};

export default article;
