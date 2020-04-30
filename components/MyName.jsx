import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { TweenMax, TimelineMax, Expo } from "gsap";

const MyName = function({ router, ...props }) {
  const nameRef = useRef(null);

  useEffect(() => {
    const { pathname } = router;
    const et = new TimelineMax();
    if (pathname !== "/article") {
      et.set(nameRef.current, {
        y: 10,
        autoAlpha: -50
      });
      TweenMax.to(nameRef.current, 1.5, {
        y: 0,
        autoAlpha: 1
      });
    }
  }, []);

  return (
    <div>
      <Link href="/" as="/">
        <h2 ref={nameRef}>sheng</h2>
      </Link>
      <style jsx>
        {`
          h2 {
            display: inline-block;
            font-family: "Poppins";
            font-size: 1rem;
            letter-spacing: 0.3rem;
            position: absolute;
            top: 8%;
            left: 4rem;
            color: #fff;
            opacity: 0;
            text-transform: uppercase;
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

          h2:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 600px) {
            h2 {
              left: 3rem;
            }
          }
          @media screen and (max-width: 400px) {
            h2 {
              left: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default withRouter(MyName);
