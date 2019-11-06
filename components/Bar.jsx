import React, { useEffect, useRef } from "react";
import { TweenMax } from "gsap";
import _ from "lodash";

const Bar = React.memo(function(props) {
  const barRef = useRef(null);
  useEffect(() => {
    if (props.currentProject === props.self) {
      TweenMax.set(barRef.current, {
        scaleX: 0.9,
        scaleY: 0.9,
        opacity: 0.6
      });
    } else if (props.currentProject !== props.self) {
      TweenMax.set(barRef.current, {
        opacity: 1
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
            transition: 0.7s;
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
