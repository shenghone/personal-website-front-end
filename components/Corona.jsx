import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import * as PIXI from "pixi.js";
import Perlin from "../util/perlin";
PIXI.utils.skipHello();

const Corona = React.memo(function Corona() {
  const divRef = useRef(null);
  const [distance, setDistance] = useState(0);

  const handleMove = _.debounce(e => {
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    const newDistance = Math.hypot(e.screenX - center.x, e.screenY - center.y);
    setDistance(newDistance);
  }, 400);

  useEffect(() => {
    const NoiseMax = 5;
    const Noise = new Perlin.Noise(Math.random());
    let width = window.innerWidth;
    let height = window.innerHeight;

    const app = new PIXI.Application({
      width: width,
      height: height,
      autoResize: true,
      resolution: devicePixelRatio,
      autoDensity: true
    });

    // this function map number to specified range
    // s is original value, a1~a2 as original range and b1~b2 as the range I want to map/scale to
    // the returned value is the relative value in b1~b2 range
    const mapNumber = (s, a1, a2, b1, b2) => {
      return b1 + ((s - a1) * (b2 - b1)) / (a2 - a1);
    };

    //resize according to the window size
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      app.renderer.resize(width, height);
    };
    window.addEventListener("resize", resize);

    let container = new PIXI.Container();
    let graphic = new PIXI.Graphics();
    let circle = new PIXI.Graphics();

    divRef.current.appendChild(app.view);
    app.stage.addChild(container);

    //circle
    circle.lineStyle(0.5, 0xffffff, 0.32);
    circle.beginFill(0x000000);
    circle.drawCircle(width / 2, height / 2, 160);
    circle.endFill();

    //position
    graphic.position.x = width / 2;
    graphic.position.y = height / 2;

    container.pivot.x = width / 2;
    container.pivot.y = height / 2;

    let phase = 0;
    app.ticker.add(delta => {
      graphic.rotation += 0.0009 * delta;
      container.position.set(width / 2, height / 2);
      let path = [];
      graphic.clear();
      graphic.lineStyle(0);
      graphic.beginFill(0xffffff, 1);

      for (let a = 0; a < 2 * Math.PI; a += 0.3) {
        let xoffset = mapNumber(Math.cos(a + phase), -1, 1, 0, NoiseMax);
        let yoffset = mapNumber(Math.sin(a + phase), -1, 1, 0, NoiseMax);
        let r = mapNumber(Noise.simplex2(xoffset, yoffset), -1, 1, 165, 195);
        let x = r * Math.cos(a);
        let y = r * Math.sin(a);
        path.push(x);
        path.push(y);
      }
      phase += 0.0006;
      graphic.drawPolygon(path);
      graphic.endFill();
    });

    container.addChild(circle);

    let blurFilter1 = new PIXI.filters.BlurFilter();
    blurFilter1.blur = 16;

    graphic.filters = [blurFilter1];

    container.addChild(graphic);
    container.setChildIndex(graphic, 0);
    container.setChildIndex(circle, 1);

    return () => {
      window.removeEventListener("resize", resize);
      app.stop();
    };
  }, []);
  return (
    <div style={{ zIndex: "-1" }}>
      <div
        className="coronaWrapper"
        onMouseMove={e => {
          e.persist();
          handleMove(e);
        }}
        ref={divRef}
      />
    </div>
  );
});

export default Corona;
