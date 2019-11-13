import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import ArticleBody from "../components/ArticleBody";

const article = props => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  console.log(props);
  return <Layout>{/*<ArticleBody articleId={props.articleId} />*/}</Layout>;
};

export default article;
