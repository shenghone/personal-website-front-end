import React, { useState } from "react";
import { graphql, compose } from "react-apollo";
import { ArticlesQuery } from "../graphql/Article";
import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";

function blog({ data, ...rest }) {
  console.log(data, rest);
  return (
    <Layout>
      <div className="blogBodyWrapper">
        {!data || !data.Articles
          ? null
          : data.Articles.map(article => {
              return (
                <ArticleCard
                  id={article.id}
                  key={article.id}
                  title={article.Title}
                  content={article.Content}
                  createdAt={article.createdAt}
                />
              );
            })}
      </div>

      <style jsx>
        {`
          .blogBodyWrapper {
            position: absolute;
            width: 60vw;
            color: #fff;
            left: 50%;
            top: 50%;
            flex-wrap: wrap;
            transform: translate(-50%, -50%);
            opacity: 0;
            animation: 6s fadeIn forwards;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          @media screen and (max-width: 1024px) {
            .blogBodyWrapper {
              width: 80vw;
            }
          }
        `}
      </style>
    </Layout>
  );
}

export default graphql(ArticlesQuery)(blog);
