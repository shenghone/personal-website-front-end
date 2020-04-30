import React, { useRef, useEffect } from "react";
import { gsap, TimelineMax, Expo } from "gsap";

const BarArea = React.memo(function ({ children }) {
  const barAreaRef = useRef(null);
  useEffect(() => {
    const et = new TimelineMax();
    gsap.set(barAreaRef.current.children, {
      opacity: 1,
    });
    et.staggerFrom(
      barAreaRef.current.children,
      0.8,
      {
        delay: 2.6,
        opacity: 0,
        y: -30,
        ease: Expo.easeOut,
      },
      0.2
    );
  }, []);
  return (
    <div>
      <div className="barAreaWrapper" ref={barAreaRef}>
        {children}
      </div>
      <style jsx>
        {`
          .barAreaWrapper {
            position: absolute;
            left: 50%;
            bottom: 10%;
            transform: translateX(-50%);
            width: 70vw;
            height: 2vh;
            display: grid;
            grid-template-rows: 2vh;
            grid-template-columns: repeat(9, 7vw);
            grid-column-gap: 0.875vw;
            opacity: 0;
            animation: fadeIn 0.5s forwards;
          }
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
});

export default BarArea;
