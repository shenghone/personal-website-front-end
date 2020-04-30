import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRandomtext } from "../customHook";
import { TweenMax, TimelineMax, Expo, Power1 } from "gsap";
import { useWidth } from "../customHook";

const AboutContent = React.memo(function(props) {
  const ulRef = useRef(null);
  const nameRef = useRef(null);
  const contentRef = useRef(null);
  const contentLeftRef = useRef(null);
  const educationRef = useRef(null);
  const contentLeftWrapper = useRef(null);
  const contentRightRef = useRef(null);
  const width = useWidth();
  const bioRef = useRef(null);

  const [index, setIndex] = useState(1);

  //whether the name animation is done
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    //give the first animation on content 2.6s delay
    //to prevent showing the mess from text reorganizing
    if (!finished) {
      TweenMax.set(bioRef.current, { opacity: 0 });
      TweenMax.to(bioRef.current, 1.4, {
        delay: 2.6,
        opacity: 1,
        ease: Power1.easeIn
      });
    } else {
      TweenMax.set(bioRef.current, { opacity: 0 });
      TweenMax.to(bioRef.current, 0.8, {
        opacity: 1,
        ease: Power1.easeIn
      });
    }
  }, [bioRef, index]);

  useRandomtext(nameRef, index);

  useEffect(() => {
    let et = new TimelineMax();
    //social-media
    TweenMax.staggerFrom(
      ulRef.current.children,
      1.2,
      {
        delay: 2,
        opacity: 0,
        ease: Expo.easeInOut
      },
      0.3
    );
    //name text
    TweenMax.from(contentLeftWrapper.current, 1.4, {
      y: 15,
      delay: 0.5,
      opacity: 0,
      ease: Expo.easeInOut
    });
    const size = window.innerWidth;
    if (size > 600) {
      //main content
      let et = new TimelineMax();
      if (!finished) {
        et.from(contentRightRef.current, 1.4, {
          delay: 2,
          width: "0%",
          ease: Expo.easeInOut,
          onComplete: function() {
            setFinished(true);
          }
        });
      }
      TweenMax.set(contentLeftRef.current, {
        width: "50%"
      });
      TweenMax.from(contentLeftRef.current, 2.6, {
        delay: 1.2,
        width: "100%",
        ease: Expo.easeInOut
      });
    } else {
      //main content

      if (!finished) {
        et.from(contentRightRef.current, 1.4, {
          delay: 2,
          height: "0%",
          ease: Expo.easeInOut,
          onComplete: function() {
            setFinished(true);
          }
        });
      }

      TweenMax.set(contentLeftRef.current, {
        height: "50%"
      });
      TweenMax.from(contentLeftRef.current, 2.6, {
        delay: 1.2,
        height: "100%",
        ease: Expo.easeInOut
      });
    }
  }, []);

  useEffect(() => {
    if (finished && width <= 600) {
      //name wrapper
      TweenMax.set(contentLeftRef.current, {
        height: "25vh",
        width: "80vw"
      });
      TweenMax.from(contentLeftRef.current, 2.6, {
        delay: 1.2,
        height: "50vh",
        ease: Expo.easeInOut
      });
      //main content
      TweenMax.set(contentRightRef.current, {
        height: "25vh",
        width: "80vw"
      });
      TweenMax.from(contentRightRef.current, 1.4, {
        delay: 2,
        height: "0",

        ease: Expo.easeInOut
      });
    } else if (finished && width > 600 && width <= 900) {
      TweenMax.set(contentLeftRef.current, {
        height: "50vh",
        width: "40vw"
      });
      TweenMax.from(contentLeftRef.current, 2.6, {
        delay: 1.2,
        width: "80vw",
        ease: Expo.easeInOut
      });
      //main content
      TweenMax.set(contentRightRef.current, {
        height: "50vh",
        width: "0"
      });
      TweenMax.to(contentRightRef.current, 1.4, {
        delay: 2,
        width: "40vw",

        ease: Expo.easeInOut
      });
    } else if (finished && width > 900) {
      //name wrapper
      TweenMax.set(contentLeftRef.current, {
        height: "50vh",
        width: "30vw"
      });
      TweenMax.from(contentLeftRef.current, 2.6, {
        delay: 1.2,
        width: "60vw",
        ease: Expo.easeInOut
      });
      //main content
      TweenMax.set(contentRightRef.current, {
        height: "50vh",
        width: "0"
      });
      TweenMax.to(contentRightRef.current, 1.4, {
        delay: 2,
        width: "30vw",
        ease: Expo.easeInOut
      });
    }
  }, [width]);

  //fade the bio content in whenever user click on "me", "education" or "skills"
  useEffect(() => {
    TweenMax.set(contentRef.current, { opacity: 1 });
    TweenMax.from(contentRef.current, 1.8, {
      opacity: 0,
      ease: Expo.easeInOut
    });
  }, [index, contentRef]);

  const contentGenerator = index => {
    if (index === 1) {
      return (
        <h6 ref={bioRef} style={{ fontWeight: 600 }}>
          Born and raised in Taiwan, Sheng Hung Tsai moved to Canada in 2014. He
          loves all the beautiful things made with code. He is a creative
          thinker, a cat lover and a web developer .
        </h6>
      );
    } else if (index === 2) {
      return (
        <div ref={bioRef}>
          <h5>Seneca College 2018</h5>
          <h6 style={{ fontWeight: "400", color: "rgba(27,27,31,0.9)" }}>
            Diploma in Computer Programmer
          </h6>
          <h5>Fu-Jen Univerisity 2013</h5>
          <h6 style={{ fontWeight: "400", color: "rgba(27,27,31,0.9)" }}>
            BBA in International Business
          </h6>
        </div>
      );
    } else {
      return (
        <div ref={bioRef}>
          <h5>Front end</h5>
          <h6 style={{ fontWeight: "400", color: "rgba(27,27,31,0.9)" }}>
            React, Pixi, Next, GSAP, Apollo Client
          </h6>
          <h5>Back end</h5>
          <h6 style={{ fontWeight: "400", color: "rgba(27,27,31,0.9)" }}>
            Node, Express, GraphQL, MongoDB
          </h6>
        </div>
      );
    }
  };

  return (
    <>
      <div className="aboutWrapper">
        <div ref={contentLeftRef} className="contentLeft">
          <div ref={contentLeftWrapper} className="contentLeftWrapper">
            <h2 ref={nameRef} className="fullName">
              <div>s</div>
              <div>h</div>
              <div>e</div>
              <div>n</div>
              <div>g</div>
              <div className="hung">h</div>
              <div className="hung">u</div>
              <div className="hung">n</div>
              <div className="hung">g</div>
              <div>t</div>
              <div>s</div>
              <div>a</div>
              <div>i</div>
            </h2>
            <p>toronto based web developer</p>
          </div>
          <ul ref={ulRef}>
            <li>
              <a href="https://www.instagram.com/shenghone/" target="_blank">
                <img src="/static/assets/ig.svg" alt="ig" />
              </a>
            </li>
            <li>
              <a href="https://github.com/shenghone" target="_blank">
                <img src="/static/assets/git.svg" alt="github" />
              </a>
            </li>
            <li className="gmailClass">
              <a href="mailto://shenghone@gmail.com" target="_blank">
                <img src="/static/assets/gmail.svg" alt="gmail" />
              </a>
            </li>
          </ul>
        </div>

        <div ref={contentRightRef} className="contentRight">
          <div className="categories">
            <p onClick={() => setIndex(1)}>me</p>
            <p onClick={() => setIndex(2)}>education</p>
            <p onClick={() => setIndex(3)}>skills</p>
          </div>
          <div ref={contentRef} className="detailedContent">
            {contentGenerator(index)}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .aboutWrapper {
            position: absolute;
            width: 60vw;
            height: 50%;
            left: 50%;
            top: 48%;
            transform: translate(-50%, -50%);
            opacity: 0;
            animation: 0.5s fadeIn forwards;
          }

          .aboutWrapper::after {
            content: "";
            width: 100%;
            height: 100%;
            outline: 1px solid #000;
            outline-offset: -3px;
            position: absolute;
            opacity: 0;
            animation: 1.8s fadeIn forwards;
            z-index: 4;
          }

          .hung {
            color: #fff;
          }

          .contentLeft {
            position: absolute;
            width: 30vw;
            height: 100%;
            background: #cecece;
            color: #000;
            display: grid;
            align-content: center;
            justify-items: center;
            font-family: "Open Sans", sans-serif;
          }

          .contentLeftWrapper {
            width: 30vw;
            display: grid;
            justify-content: center;
          }

          .contentLeftWrapper > p {
            color: rgb(116, 125, 140);
            font-weight: 100;
            letter-spacing: 0.06rem;
            margin-top: 1rem;
            display: grid;
            justify-self: center;
            font-size: 0.8rem;
          }

          .fullName {
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            text-align: center;
            font-size: 1.1rem;
          }

          .fullName > div {
            margin: 0 0.1rem;
            display: inline-block;
          }

          .contentRight {
            display: grid;
            background: #d63031;
            width: 30vw;
            height: 100%;
            position: absolute;
            right: 0;
            color: #000;
          }

          .detailedContent {
            display: grid;
            align-self: center;
            justify-self: center;
            font-family: "Open Sans", sans-serif;
            text-align: justify;
            box-sizing: border-box;
            margin: 2rem;
            line-height: 1.8rem;
            letter-spacing: 0.07rem;
<<<<<<< HEAD
            font-size: 0.8rem;
=======
            font-size: 0.95rem;
>>>>>>> 60517c3cd5794e9e5b6e549eca814ce246806afe
            transition: 1s all;
          }

          .categories {
            width: 180px;
            background: transparent;
            height: 3vh;
            position: absolute;
            font-size: 12px;
            top: 20px;
            right: 3px;
            display: grid;
            grid-template-columns: repeat(3, 60px);
            grid-template-rows: 3vh;
            grid-template-areas: "a b c";
            z-index: 5;
            opacity: 0;
            animation: 2.2s fadeIn forwards;
          }

          .categories p {
            display: grid;
            justify-self: center;
            position: relative;
            font-weight: bold;
            letter-spacing: 0.04rem;
            text-align: center;
          }

          .categories > p:hover {
            opacity: 0.45;
            cursor: pointer;
          }

          a:hover {
            opacity: 0.4;
            cursor: pointer;
          }

          ul {
            width: 100px;
            position: absolute;
            display: block;
            z-index: 10;
            left: 3%;
            bottom: 2%;
          }

          li {
            position: relative;
            display: inline;
            color: #fff;
            margin: 0 0.2rem 0 0;
          }
          text {
            opacity: 0;
            animation: 0.5s fadeIn forwards;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          img {
            transform: scale(0.45);
            z-index: 5;
          }
          .gmailClass {
            top: 1px;
          }
          @media screen and (max-width: 900px) {
            .aboutWrapper {
              top: 47%;
              width: 80vw;
              height: 50vh;
            }
            .contentLeft {
              width: 40vw;
            }
            .contentLeftWrapper {
              width: 40vw;
            }
            .contentRight {
              width: 40vw;
            }
            .fullName {
              font-size: 0.9rem;
            }
            .contentLeft p {
              font-size: 0.7rem;
            }
          }
          @media screen and (max-width: 600px) {
            .contentLeft {
              top: 0;
              left: 0;
              width: 80vw;
              height: 25vh;
            }
            .contentLeftWrapper {
              top: 0;
              left: 0;
              width: 80vw;
              height: 25vh;
              display: grid;
              align-items: center;
            }
            .contentRight {
              width: 80vw;
              height: 25vh;
              bottom: 0;
            }
            .contentLeftWrapper > p {
              position: absolute;
              margin-top: 3rem;
              font-size: 0.8rem;
            }

            ul {
              left: 3%;
              top: 3%;
            }
          }
          @media screen and (max-width: 500px) {
            .detailedContent {
              font-size: 0.85rem;
              line-height: 1rem;
            }
          }
        `}
      </style>
    </>
  );
});

export default AboutContent;
