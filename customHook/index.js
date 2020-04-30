import React, { useEffect, useState } from "react";
import _ from "lodash";

//get random characters from the ref element being passed in
//first fade out to the right and then fade back in sequentially
export const useRandomtext = (textRef, index) => {
  useEffect(() => {
    let randomArr = [];
    const len = textRef.current.children.length;
    const randomLength = _.random(5, Math.floor(len * 0.8));

    for (let i = 0; i < randomLength; i++) {
      let seed = _.random(0, len - 1);
      randomArr.push(textRef.current.children[seed]);
    }

    //to ensure there's no repetitive character
    randomArr = [...new Set(randomArr)];

    const et = new TimelineMax();
    et.staggerTo(
      randomArr,
      0.2,
      { delay: 0.8, ease: Power0.easeIn, x: "100%", opacity: 0 },
      0.04
    ).staggerTo(
      randomArr,
      0.6,
      {
        ease: Power4.easeOut,
        startAt: { x: "65%" },
        x: "0%",
        opacity: 1,
      },
      0.04
    );
  }, [textRef, index]);
};

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const resize = () => {
    let newWidth = window.innerWidth;
    setWidth(newWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return width;
};
