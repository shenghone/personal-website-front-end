import React from "react";
import Layout from "../components/Layout";
import ArticleBody from "../components/ArticleBody";

const article = props => {
  console.log(props);
  return <Layout>{/*<ArticleBody articleId={props.articleId} />*/}</Layout>;
};

article.getInitialProps = async ({ query: { id } }) => {
  return { articleId: id };
};

export default article;
