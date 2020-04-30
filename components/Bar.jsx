import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import _ from "lodash";

const Bar = function (props) {
  const barRef = useRef(null);
  useEffect(() => {
    if (
      props.currentProject &&
      props.self &&
      props.currentProject.id === props.self.id
    ) {
      gsap.set(barRef.current, {
        scale: 0.9,
        opacity: 0.6,
      });
    } else if (
      props.currentProject &&
      props.self &&
      props.currentProject.id !== props.self.id
    ) {
      gsap.to(barRef.current, 1, {
        scale: 1,
        opacity: 1,
        delay: -0.4,
      });
    }
  }, [props.currentProject, props.self]);
  return (
    <div>
      <div
        className="barWrapper"
        ref={barRef}
        onClick={() => {
          props.setCurrentProject(props.self);
          props.setNum(props.num);
        }}
      />
      <style jsx>
        {`
          .barWrapper {
            position: absolute;
            height: 1.5vh;
            width: 7vw;
            background: #fff;
            transform-origin: 50% 50%;
            transition: 0.8s;
          }
          .barWrapper:hover {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Bar;
