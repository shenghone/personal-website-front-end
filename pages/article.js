import React from "react";
import Layout from "../components/Layout";
import ArticleBody from "../components/ArticleBody";

const article = React.memo(function(props) {
  console.log(props);
  return (
    <Layout>
      <ArticleBody articleId={props.articleId} />
    </Layout>
  );
});

article.getInitialProps = async ({ query: { id } }) => {
  return { articleId: id };
};

export default article;
