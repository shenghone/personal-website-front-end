import React from "react";
import Navbar from "./Navbar";
import MyName from "./MyName";

export default ({ children }) => (
  <div>
    <MyName />
    {children}
    <Navbar />
    <style jsx global>
      {`
        *{
          margin: 0;
          padding: 0;
        }
        body {
          color: #fff;
          font-family: "Roboto"
          width: 100vw;
          height: 100%;
          overflow: hidden;
          overflow-y: scroll;
          background: #000;
        }
      `}
    </style>
  </div>
);
