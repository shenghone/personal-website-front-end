import React, { useState, useRef, useEffect } from "react";
import { Mutation } from "react-apollo";
import { TweenMax, TimelineMax, Expo } from "gsap";
import { gql } from "apollo-boost";

const ProjectItem = function(props) {
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const pictureContainerRef = useRef(null);
  const descriptionRef = useRef(null);
  const frontEndRef = useRef(null);
  const backEndRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const [finishedLoading, setFinishedLoading] = useState(false);

  const projectPage = () => {
    const url = props.currentProject.Link;
    window.open(url, "_blank");
  };

  const handleLoaded = () => {
    setFinishedLoading(true);
  };

  const handleEnter = () => {
    TweenMax.set(imageContainerRef.current, {
      css: {
        zIndex: 3
      }
    });
  };
  const handleLeave = () => {
    TweenMax.set(imageContainerRef.current, {
      css: {
        zIndex: -1
      }
    });
  };

  const getText = val => {
    val++;
    if (val.toString().length < 2) {
      return `0${val}`;
    }
  };

  useEffect(() => {
    TweenMax.set(titleRef.current, {
      y: 0,
      opacity: 1
    });
    TweenMax.from(titleRef.current, 1, {
      y: -10,
      delay: 0.7,
      opacity: 0
    });

    TweenMax.set(descriptionRef.current, {
      y: 0,
      opacity: 1
    });
    TweenMax.from(descriptionRef.current, 1, {
      y: -10,
      delay: 1.4,
      opacity: 0
    });

    TweenMax.set(frontEndRef.current, {
      x: 0,
      opacity: 1
    });

    TweenMax.from(frontEndRef.current, 1, {
      x: -10,
      delay: 2,
      opacity: 0
    });

    TweenMax.set(backEndRef.current, {
      x: 0,
      opacity: 1
    });
    TweenMax.from(backEndRef.current, 1, {
      x: -10,
      delay: 2,
      opacity: 0
    });

    TweenMax.set(numberRef.current, {
      x: 0,
      opacity: 1
    });
    TweenMax.from(numberRef.current, 1, {
      delay: 2.4,
      x: 30,
      opacity: 0
    });
  }, [props.currentProject]);

  useEffect(() => {
    const et = new TimelineMax();
    const et1 = new TimelineMax();
    //for image, when it's loaded, fade in
    et.set(imageRef.current, {
      opacity: 0
    }).to(imageRef.current, 1.2, {
      opacity: 1
    });

    et1
      .set(imageContainerRef.current, {
        x: 30,
        opacity: 0
      })
      .to(imageContainerRef.current, 1.2, {
        delay: 1.4,
        opacity: 1,
        x: 0,
        ease: Expo.easeIn
      });
  }, [finishedLoading, imageRef, imageContainerRef, props.currentProject]);
  const {
    FrontEnd,
    BackEnd,
    Link,
    Asset,
    Title,
    Description
  } = props.currentProject;
  const { Index } = props;
  return (
    <div>
      <div className="projectItemWrapper">
        <div className="textArea">
          <div className="description">
            <h2 ref={titleRef}>{Title}</h2>
            <h3 ref={descriptionRef}>
              <span className="line">
                <span className="youcantseeme">xx</span>
              </span>{" "}
              {Description}
            </h3>
            <h4 ref={frontEndRef}> Front-end: {FrontEnd}</h4>
            <h4 ref={backEndRef}>Back-end: {BackEnd ? BackEnd : "none"}</h4>
          </div>
          <div ref={numberRef} className="backgroundText">
            <h1>{getText(Index)}</h1>
          </div>
        </div>
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          ref={imageContainerRef}
          className="pictureContainer"
        >
          <img
            ref={imageRef}
            onLoad={handleLoaded}
            src={Asset}
            alt="project image"
            onClick={projectPage}
          />
        </div>
      </div>
      <style jsx>
        {`
          * {
            font-family: "Open Sans", sans-serif;
          }
          .projectItemWrapper {
            top: 48%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            width: 70vw;
            height: 55vh;
            display: grid;
            align-items: center;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          .pictureContainer {
            display: grid;
            align-self: center;
            position: absolute;
            right: 0;
            width: 600px;
            height: 300px;
            object-fit: cover;
            overflow: hidden;
          }

          .textArea {
            display: grid;
            align-content: center;
            z-index: 3;
            position: absolute;
            left: 0;
            height: 55vh;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
          }
          .pictureContainer > img {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: 1s;
            filter: blur(0.5px);
          }

          .pictureContainer > img:hover {
            cursor: pointer;
            transform: scale(1.05);
            filter: none;
          }

          h3 {
            margin: 0.5rem;
            width: 15rem;
            letter-spacing: 0.08rem;
            line-height: 1.8rem;
            font-weight: 500;
            font-size: 0.6rem;
            color: rgba(225, 45, 47, 0.85);
          }
          .youcantseeme {
            color: #000;
          }
          .line {
            text-decoration: line-through;
            color: rgba(225, 45, 47, 0.85);
          }
          h1 {
            position: absolute;
            letter-spacing: 2rem;
            font-size: 4rem;
            color: rgba(238, 238, 238, 0.13);
          }
          h4 {
            font-size: 0.7rem;
            letter-spacing: 0.07rem;
            line-height: 1.5rem;
            font-weight: 500;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
          }
          h2 {
            font-size: 1.45rem;
            color: rgba(225, 45, 47, 0.85);
            letter-spacing: 0.2rem;
            font-size: 1.3rem;
            font-weight: bold;
            padding-bottom: 0.5rem;
          }

          @media screen and (max-width: 995px) {
            .projectItemWrapper {
              top: 45%;
              height: 55%;
              justify-content: center;
            }

            .pictureContainer {
              height: 210px;
              width: 420px;
              position: relative;
              display: grid;
              align-self: end;
              justify-self: center;
            }
            .textArea {
              position: relative;
              align-self: start;
              top: 0;
              height: 210px;
              width: 420px;
            }
            h1 {
              position: absolue;
              text-align: right;
              right: 0;
              bottom: 80px;
            }
          }

          @media screen and (max-width: 760px) {
            .projectItemWrapper {
              height: 50%;
              justify-content: center;
            }
            .pictureContainer {
              width: 380px;
              height: 190px;
            }
            .textArea {
              width: 380px;
              height: 190px;
            }
            h2 {
              font-size: 1.1rem;
            }
          }
          @media screen and (max-width: 550px) {
            .projectItemWrapper {
              height: 50%;
              justify-content: center;
              width: 80vw;
            }
            .pictureContainer {
              width: 320px;
              height: 160px;
            }
            .textArea {
              box-sizing: border-box;
              margin: 1.5rem;
              width: 320px;
              height: 160px;
            }
            h2 {
              font-size: 0.85rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProjectItem;
