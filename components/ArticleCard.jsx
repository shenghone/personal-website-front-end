import React, { useRef } from "react";
import { compose } from "react-apollo";
import Router from "next/router";
import dayjs from "dayjs";
import { Value } from "slate";
import { useRandomtext } from "../customHook";
import { TweenMax } from "gsap";

const ArticleCard = props => {
  console.log(props);
  const bgRef = useRef(null);
  const { title, content, id, createdAt } = props;

  const handleRoute = toPage => {
    Router.push(`/article/${toPage}`);
  };

  const getFirstParagraph = data => {
    const doc = JSON.parse(content).document;
    let firstParagraph = "";
    let wordCount = 0;
    doc.nodes[0].nodes.forEach(n => {
      firstParagraph += n.text;
    });
    if (firstParagraph.split(" ").length > 30) {
      firstParagraph += " ...";
    }
    return firstParagraph;
  };
  const handleEnter = () => {
    const animate = () => {
      TweenMax.to(bgRef.current, 1.4, {
        css: {
          rotation: 90
        }
      });
      TweenMax.to(bgRef.current, 0.8, {
        css: {
          scale: 0.9,
          borderRadius: "50%"
        }
      });
    };
    window.requestAnimationFrame(animate);
  };
  const handleLeave = () => {
    const animate = () => {
      TweenMax.to(bgRef.current, 0.8, {
        css: {
          scale: 1,
          rotation: 180,
          borderRadius: "0px"
        }
      });
    };
    window.requestAnimationFrame(animate);
  };
  return (
    <div>
      <div
        className="ArticleCardWrapper"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => handleRoute(id)}
      >
        <div className="titleClass">
          <h4>{title}</h4>
          <span ref={bgRef} className="bg" />
        </div>
        <h5 className="contentClass">{getFirstParagraph()}</h5>
        <p className="publishDate">
          {dayjs(parseInt(createdAt))
            .add(
              dayjs(parseInt(createdAt))
                .toDate()
                .getTimezoneOffset(),
              "minute"
            )
            .format("MMM DD, YYYY")}
        </p>
      </div>
      <style jsx>
        {`
          .ArticleCardWrapper {
            position: relative;
            box-sizing: border-box;
            margin: 30px 0;
            padding-left: 30px;
            flex: 0 0 100%;
            min-width: 50vw;
            height: 150px;
            display: flex;
            cursor: pointer;
          }
          .titleClass {
            position: relative;
            letter-spacing: 0.2rem;
            
            font-size: 1.2rem;
            padding: 1.5rem;
            color: #000;
            align-self: center;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;

          }
          .titleClass>h4{
            position: absolute;
            text-align: center;

          }
          .bg{
            position: absolute;
            background: #eae9e9;
            width: 140px;
            height: 140px;
            z-index:-1;
          }

          .contentClass {
            position: relative;
            display: flex;
            width: calc(100% - 200px)
            font-weight: 300;
            place-items: center;
            padding: 2rem;
            margin: 0px 2rem;
            color: #eae9e9;
            font-size: 0.8rem;
            letter-spacing: 0.02rem;
          }

          .publishDate {
            position: absolute;
            color: #ed1250;
            font-size: 0.65rem;
            right: 1rem;
            bottom: 0.2rem;
            font-weight: 100;
            letter-spacing: 0.1rem;
          }
          @media screen and (max-width: 960px){
            .publishDate {
              right: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ArticleCard;
