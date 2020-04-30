import React from "react";
import { cx, css } from "emotion";

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
        & + * {
          margin-top: 10px;
        }
      `
    )}
  />
));

export const Icon = React.forwardRef(({ className, bgi, ...rest }, ref) => (
  <span
    {...rest}
    ref={ref}
    className={cx(
      "material-icons",
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  >
    <img
      style={{ fill: "white", transform: "scale(0.55)" }}
      src={"/static/icons/" + `${bgi}` + ".svg"}
    />
  </span>
));

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        margin-top: 2px;
        padding: 2px 10px;
        border-bottom: 1px solid #fff6da;
      `
    )}
  />
));
