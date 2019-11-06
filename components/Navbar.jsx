import React, { useRef, useEffect, useState } from "react";
import { TweenMax, Expo } from "gsap";
import { useSelector } from "react-redux";
import { graphql, compose } from "react-apollo";
import { withRouter } from "next/router";
import { MeQuery } from "../graphql/Author";
import { useWidth } from "../customHook";
import Link from "next/link";

function Navbar({ router, ...props }) {
  const navRef = useRef(null);
  const blogARef = useRef(null);
  const blogRef = useRef(null);
  const burgerRef = useRef(null);
  const publishARef = useRef(null);
  const publishRef = useRef(null);
  const projectsARef = useRef(null);
  const projectsRef = useRef(null);
  const aboutARef = useRef(null);
  const aboutRef = useRef(null);
  const linkWrapperRef = useRef(null);
  const smMenuRef = useRef(null);
  const width = useWidth();
  const [menuStatus, setMenuStatus] = useState(false);

  //if current url is "/article" or "/publish",
  //move the navbar to the top
  useEffect(() => {
    TweenMax.set(linkWrapperRef.current, {
      opacity: 0
    });
    const { pathname } = router;
    if (
      pathname === "/article" ||
      pathname === "/publish" ||
      pathname === "/blog"
    ) {
      navRef.current.style.display = "flex";
      TweenMax.set(navRef.current.children, {
        margin: "0 5px",
        padding: "2px 0"
      });

      if (!props.MeQuery.loading && !props.MeQuery.error && props.MeQuery.Me) {
        TweenMax.set(linkWrapperRef.current, {
          opacity: 1,
          top: "9%",
          width: "5rem",
          right: "18%"
        });
      } else {
        TweenMax.set(linkWrapperRef.current, {
          opacity: 1,
          top: "9%",
          width: "2rem"
        });
        if (width > 960) {
          TweenMax.set(linkWrapperRef.current, {
            opacity: 1,
            right: "18%"
          });
        }
      }
      if (width < 960) {
        TweenMax.set(linkWrapperRef.current, {
          right: "8%"
        });
      }
    } else {
      if (width >= 960) {
        if (
          !props.MeQuery.loading &&
          !props.MeQuery.error &&
          props.MeQuery.Me
        ) {
          TweenMax.set(linkWrapperRef.current, {
            bottom: "6%",
            right: "3%"
          });
        } else {
          TweenMax.set(linkWrapperRef.current, {
            bottom: "4%",
            right: "3%"
          });
        }
      } else {
        TweenMax.to(linkWrapperRef.current, 0.6, {
          opacity: 1,
          bottom: "12%",
          right: "0"
        });
      }
    }
  }, [props, width]);

  useEffect(() => {
    TweenMax.set(navRef.current.children, { opacity: 1, y: 0 });
    TweenMax.staggerFrom(
      navRef.current.children,
      1.1,
      {
        delay: 0.3,
        opacity: 0,
        y: 30,
        ease: Expo.easeInOut
      },
      0.2
    );
  }, []);

  const getTextWidth = (text, font) => {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = "0.4rem Poppins";
    var metrics = context.measureText(text);
    return metrics.width * 2;
  };

  const handleHover = (passedRef, passedARef) => {
    let textWidth = getTextWidth(passedARef.current.innerText);
    TweenMax.to(passedRef.current, 0.8, {
      width: textWidth
    });
  };

  const handleLeave = passedRef => {
    const animate = () => {
      TweenMax.to(passedRef.current, 0.8, {
        width: "0%"
      });
    };
    window.requestAnimationFrame(animate);
  };

  //animate burger menu
  const handleBurgerHover = () => {
    const anim = () => {
      TweenMax.to(burgerRef.current.children, 1, {
        width: "100%",
        opacity: 0.65
      });
    };
    if (!menuStatus) {
      window.requestAnimationFrame(anim);
    }
  };

  const handleBurgerLeave = () => {
    const anim = () => {
      TweenMax.to(burgerRef.current.children, 1, {
        opacity: 1
      });
      TweenMax.set(burgerRef.current.children, {
        rotation: 0,
        width: "100%"
      });
      TweenMax.to(burgerRef.current.children[1], 1, {
        width: "60%",

        rotation: 0
      });
      TweenMax.to(burgerRef.current.children[2], 1, {
        width: "20%",
        rotation: 0
      });
    };

    if (!menuStatus) {
      window.requestAnimationFrame(anim);
    }
  };
  const handleBurgerClick = () => {
    setMenuStatus(!menuStatus);
  };

  useEffect(() => {
    if (width >= 960) {
      setMenuStatus(false);
    }
    if (menuStatus) {
      TweenMax.set(burgerRef.current.children, {
        opacity: 0
      });
      TweenMax.to(burgerRef.current.children, 1, {
        opacity: 1,
        background: "#000"
      });
    } else {
      TweenMax.set(burgerRef.current.children, {
        opacity: 0
      });
      TweenMax.to(burgerRef.current.children, 1, {
        opacity: 1,
        background: "#fff"
      });
    }
  }, [menuStatus, width]);

  //to position the small screen menu depending on the current path
  useEffect(() => {
    const { pathname } = router;
    if (
      (pathname === "/blog" ||
        pathname === "/publish" ||
        pathname === "/article") &&
      menuStatus &&
      width < 960
    ) {
      TweenMax.set(smMenuRef.current, {
        opacity: 0,
        top: "-13%"
      });
      TweenMax.to(smMenuRef.current, 1, {
        opacity: 1,
        x: "-10vw"
      });
    } else if (
      pathname !== "/blog" &&
      pathname !== "/publish" &&
      pathname !== "/article" &&
      menuStatus &&
      width < 960
    ) {
      TweenMax.set(smMenuRef.current, {
        opacity: -1.2,
        top: "-88vh"
      });
      if (width > 680) {
        TweenMax.to(smMenuRef.current, 0.8, {
          delay: 0.1,
          opacity: 1,
          x: "-13vw"
        });
      } else if (width <= 680) {
        TweenMax.to(smMenuRef.current, 0.8, {
          delay: 0.1,
          opacity: 1,
          x: "-8vw"
        });
      }
    }
  }, [props, menuStatus, width]);
  return (
    <>
      <div className="linkWrapper" ref={linkWrapperRef}>
        {menuStatus && (
          <div className="smallScreenMenu" ref={smMenuRef}>
            <Link href={router.pathname !== "/about" ? "/about" : {}}>
              <a>about</a>
            </Link>
            <Link href={router.pathname !== "/projects" ? "/projects" : {}}>
              <a>projects</a>
            </Link>
            <Link href={router.pathname !== "/blog" ? "/blog" : {}}>
              <a>blog</a>
            </Link>
          </div>
        )}
        <div
          className="burgerMenu"
          ref={burgerRef}
          onMouseEnter={handleBurgerHover}
          onMouseLeave={handleBurgerLeave}
          onClick={handleBurgerClick}
        >
          <span className="bar first"></span>
          <span className="bar second"></span>
          <span className="bar third"></span>
        </div>
        <div className="links" ref={navRef}>
          {!props.MeQuery.error && !props.MeQuery.loading && props.MeQuery.Me && (
            <a
              ref={publishARef}
              onMouseEnter={() => handleHover(publishRef, publishARef)}
              onMouseLeave={() => handleLeave(publishRef)}
              onClick={() =>
                router.pathname !== "/publish" ? router.push("/publish") : {}
              }
            >
              <span ref={publishRef} className="underline" />
              publish
            </a>
          )}
          <a
            ref={aboutARef}
            onMouseEnter={() => handleHover(aboutRef, aboutARef)}
            onMouseLeave={() => handleLeave(aboutRef)}
            onClick={() =>
              router.pathname !== "/about" ? router.push("/about") : {}
            }
          >
            <span ref={aboutRef} className="underline" />
            ABOUT
          </a>
          <a
            ref={projectsARef}
            onMouseEnter={() => handleHover(projectsRef, projectsARef)}
            onMouseLeave={() => handleLeave(projectsRef)}
            onClick={() =>
              router.pathname !== "/projects" ? router.push("/projects") : {}
            }
          >
            <span ref={projectsRef} className="underline" />
            PROJECTS
          </a>
          <a
            ref={blogARef}
            onMouseEnter={() => handleHover(blogRef, blogARef)}
            onMouseLeave={() => handleLeave(blogRef)}
            onClick={() =>
              router.pathname !== "/blog" ? router.push("/blog") : {}
            }
          >
            <span ref={blogRef} className="underline" />
            BLOG
          </a>
        </div>
      </div>
      <style jsx>
        {`
          .linkWrapper {
            position: absolute;
            right: 3%;
            width: 5rem;
            opacity: 0;
            bottom: 20%;
            animation: 3.2s fadeIn forwards;
            z-index: 20;
          }
          .smallScreenMenu {
            position: absolute;
            width: 25vw;
            height: 100vh;
            background: #cecece;
            display: grid;
            animation: 0.5s fadeIn forwards;
            justify-content: center;
            align-content: center;
            opacity: 0.56;
          }
          .smallScreenMenu a {
            color: #000;
            letter-spacing: 0.2rem;
            transition: 1s;
          }
          .smallScreenMenu a:hover {
            letter-spacing: 0.35rem;
          }

          .links > a {
            font-family: Poppins;
            position: relative;
            font-size: 0.6rem;
            text-align: justify;
          }
          .lk:hover {
            letter-spacing: 0.3rem;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          @media screen and (max-width: 960px) {
            .burgerMenu {
              position: absolute;
              width: 20px;
              height: 20px;
              opacity: 0;
              animation: 3.5s fadeIn forwards;
              cursor: pointer;
              z-index: 99;
            }
            .links > a {
              display: none;
            }
            .bar {
              display: block;
              position: absolute;
              background: #fff;
              height: 2px;
            }

            .first {
              width: 100%;
              margin-top: 10%;
            }
            .second {
              width: 60%;
              margin-top: 30%;
              right: 0;
            }
            .third {
              width: 20%;
              margin-top: 50%;
              right: 0;
            }
          }
          a {
            position: relative;
            display: grid;
            justify-content: center;
            padding: 0.2rem 0;
            margin: 0.8rem 0;
            text-decoration: none;
            letter-spacing: 0.15rem;
            color: #fff;
          }
          .underline {
            display: grid;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
            background: #d63031;
            bottom: -0.2rem;
            height: 1px;
            transform-origin: center;
          }

          a:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 1200px) {
            a {
              font-size: 0.6rem;
            }
          }
        `}
      </style>
    </>
  );
}

export default compose(
  withRouter,
  graphql(MeQuery, { name: "MeQuery" })
)(Navbar);
