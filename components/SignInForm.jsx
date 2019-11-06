import React, { useEffect, useState, useRef } from "react";
import { graphql, compose } from "react-apollo";
import { SignInMutation, SignOutMutation } from "../graphql/Author";
import { signInAction, signOutAction } from "../redux";
import { useDispatch, useSelector } from "react-redux";

import Router from "next/router";

const INITIAL_STATE = {
  Email: "",
  Password: ""
};

function SignInForm(props) {
  const imageRef = useRef(null);
  const [values, setValue] = useState(INITIAL_STATE);
  const dispatch = useDispatch();

  const signOut = () => dispatch(signOutAction());
  const signIn = () => dispatch(signInAction());
  const auth = useSelector(state => state.authenticated);

  const handleChange = e => {
    setValue({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  //once the picture is loaded, let it fade in
  useEffect(() => {
    let currentEl = imageRef.current;
    currentEl.onload = function() {
      currentEl.style.opacity = 1;
    };
    currentEl.onload();
    return () => {
      currentEl.onload();
      setValue(null);
    };
  }, [imageRef]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const suc = await props.SignInMutation({
        variables: {
          Email: values.Email,
          Password: values.Password
        }
      });
      if (!suc.error) {
        signIn();
        Router.push("/blog");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTime = () => {
    const time = new Date();
    const hour = time.getHours();
    return hour >= 0 && hour < 12 ? "Sup, morning" : "Sup, good evening";
  };

  const handleSignOut = async e => {
    await props.SignOutMutation();
    signOut();
    Router.push("/blog");
  };

  return (
    <div style={{ color: "#000" }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="formLeft">
          <img
            ref={imageRef}
            className="tower"
            src="../static/assets/charlesPostiaux.jpg"
          />
          <h2>{getTime()}</h2>
        </div>
        <div className="formRight">
          <div className="centeredDiv">
            <label htmlFor="email">
              E-mail
              <input
                onChange={handleChange}
                name="Email"
                type="email"
                required
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                onChange={handleChange}
                name="Password"
                type="password"
                required
              />
            </label>
          </div>
          <div className="bottomDiv">
            {!auth ? (
              <button type="submit">Sign in</button>
            ) : (
              <button onClick={handleSignOut} type="button">
                Sign out
              </button>
            )}
          </div>
        </div>
      </form>
      <style jsx>
        {`
          form {
            font-family: "Open Sans", sans-serif;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50vw;
            height: 45vh;
            background: #cecece;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 1px 1px 1px rgba(256, 256, 256, 0.65);
          }

          h2 {
            position: absolute;
            margin-top: 2.1rem;
          }
          .formLeft {
            position: absolute;
            display: grid;
            width: 20vw;
            height: 100%;
            justify-items: center;
            overflow: hidden;
          }

          .tower {
            width: 100%;
            height: 100%;
            object-fit: cover;
            overflow: hidden;
            opacity: 0;
            transition: 1s all;
            z-index: -1;
          }

          .formLeft:hover .tower {
            transform: scale(1.1);
            filter: blur(2px);
          }

          .formLeft:hover::after {
            transform: scale(1.12);
            opacity: 0.85;
            filter: blur(1px);
          }

          h2 {
            color: #c23616;
            font-size: 0.9rem;
          }
          .formRight {
            position: absolute;
            right: 0;
            width: 30vw;
            height: 45vh;
            background: rgba(242, 246, 250, 0.45);
            display: grid;
            grid-template-rows: 8vh 20vh 17vh;
            grid-template-columns: 30vw;
            grid-template-areas:
              "a"
              "b"
              "c";
          }

          .centeredDiv {
            position: absolute;
            grid-area: "b";
            display: grid;
            justify-items: center;
            width: 100%;
            margin-top: 3rem;
          }

          label {
            display: grid;
            justify-content: center;

            font-size: 10px;
            letter-spacing: 0.06rem;
            width: 100%;
            color: #000;
            margin: 0.65rem 0;
          }

          input {
            padding: 0.1rem;
            margin: 0.1rem 0;
            font-size: 16px;
            width: 12rem;
            height: 25px;
            background: transparent;
            outline: 0;
            border-width: 0 0 1px;
            border-color: rgba(0, 0, 0, 0.45);
          }

          input:focus {
            border-color: #fff;
          }
          button {
            width: 12rem;
            margin: 0.5rem;
            padding: 0.5rem;
            font-size: 11px;
            letter-spacing: 0.08rem;
            border-radius: 20px;
            color: #fff;
            background: #000;
            outline: 0;
            border: none;
            box-shadow: 2px 2px 8px #333;
          }

          .bottomDiv {
            position: absolute;
            display: grid;
            grid-area: c;
            justify-self: center;
            align-self: center;
          }
          button:hover {
            opacity: 0.65;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export default compose(
  graphql(SignOutMutation, { name: "SignOutMutation" }),
  graphql(SignInMutation, { name: "SignInMutation" })
)(SignInForm);
