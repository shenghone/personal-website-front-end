import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import MyName from "../components/MyName";
import Navbar from "../components/Navbar";
import { signInAction, signOutAction } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { MeQuery } from "../graphql/Author";
import { graphql } from "react-apollo";

const Corona = dynamic(() => import("../components/Corona"), { ssr: false });

function index(props) {
  const [entered, setEnter] = useState(false);
  const blockerRef = useRef(null);
  const auth = useSelector(state => state.authenticated);
  const dispatch = useDispatch();
  const signIn = () => dispatch(signInAction());
  const signOut = () => dispatch(signOutAction());

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { Me } = await props.MeQuery;
        if (Me) {
          signIn();
        } else {
          signOut();
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, [auth]);
  useEffect(() => {
    if (entered) {
      blockerRef.current.style.opacity = 0;
      blockerRef.current.style.borderRadius = "50%";
      blockerRef.current.style.transform = "translate(-50%, -50%) scale(0.01)";
    }
  }, [entered]);
  return (
    <div>
      <Head>
        <title>Sheng</title>
        <link rel="stylesheet" href="https://use.typekit.net/vmz2gfd.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Old+Standard+TT:700"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <div className="outter">
          {!entered && (
            <p className="enter" onClick={() => setEnter(true)}>
              enter
            </p>
          )}
          {entered && <MyName />}
          <div ref={blockerRef} className="blocker" />
          <Corona />
          {entered && <Navbar />}
        </div>
      </div>
      <style jsx global>
        {`
          *{
            margin: 0;
            padding: 0;
          }
          body {
            position: absolute;
            font-family: "Roboto"
            width: 100vw;
            height: 100%;
            overflow: hidden;
            background: #000;
          }
        `}
      </style>
      <style jsx>
        {`
          .backToFrontPage:hover {
            cursor: pointer;
            opacity: 0.65;
          }
          .blocker {
            position: absolute;
            width: 100vw;
            height: 100vh;
            left: 50%;
            top: 50%;
            box-sizing: border-box;
            transform: translate(-50%, -50%);
            z-index: 4;
            background: #000;
            transition: 1s;
          }

          .enter {
            position: absolute;
            color: #cad3c8;
            text-transform: uppercase;
            letter-spacing: 0.45rem;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-size: 1rem;
            z-index: 11;
            opacity: 0;

            animation: 5s toFadeIn forwards;
          }
          .enter:hover {
            opacity: 0.65;
            cursor: pointer;
          }
          @keyframes toFadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          .enter:hover::before {
            content: "";
            position: absolute;
            width: 0;
            left: -1px;
            height: 0.3rem;
            background: rgba(255, 63, 52, 0.5);
            bottom: -8px;
            opacity: 0;

            animation: enterLeftToRight 1s forwards;
          }
          @keyframes enterLeftToRight {
            0% {
              width: 0;
              opacity: 0;
            }
            100% {
              width: 95%;
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default graphql(MeQuery, { name: "MeQuery" })(index);
