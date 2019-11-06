import React, { useRef } from "react";

const Contact = React.memo(function() {
  return (
    <div>
      <ul>
        <li>
          <a href="https://www.instagram.com/shenghone/" target="_blank">
            <ion-icon name="logo-instagram" />
          </a>
        </li>
        <li>

            <a href="https://github.com/shenghone" target="_blank" />
  
        </li>
        <li>
          <a href="mailto://shenghone@gmail.com" target="_blank">
            <ion-icon name="mail" />
          </a>
        </li>
      </ul>
      <style jsx>
        {`
          ul {
            position: absolute;
            display: block;
            color: #fff;
          }
          li {
            color: #fff;
            margin: 1rem 0;
            list-style: none;
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
});

export default Contact;
