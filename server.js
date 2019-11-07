const express = require("express");
const next = require("next");
const compression = require("compression");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.disable("x-powered-by");
  server.use(compression());

  server.get("/", (req, res) => {
    return app.render(req, res, "/index", req.query);
  });

  server.get("/about", (req, res) => {
    return app.render(req, res, "/about", req.query);
  });

  server.get("/signIn", (req, res) => {
    return app.render(req, res, "/signIn", req.query);
  });

  server.get("/blog", (req, res) => {
    return app.render(req, res, "/blog", req.query);
  });

  server.get("/publish", (req, res) => {
    return app.render(req, res, "/publish", req.query);
  });

  server.get("/article/:id", (req, res) => {
    return app.render(req, res, "/article", { id: req.params.id });
  });

  server.get("/projects", (req, res) => {
    return app.render(req, res, "/projects", req.query);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
