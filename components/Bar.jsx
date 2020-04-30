import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import _ from "lodash";

const Bar = React.memo(function (props) {
  const barRef = useRef(null);
  useEffect(() => {
    if (props.currentProject === props.self) {
      gsap.to(barRef.current, 1, {
        scale: 0.9,
        opacity: 0.6,
      });
    } else if (props.currentProject !== props.self) {
      gsap.to(barRef.current, 1, {
        scale: 1,
        opacity: 1,
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
          }
          .barWrapper:hover {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
});

export default Bar;
