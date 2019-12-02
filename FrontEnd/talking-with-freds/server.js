const next = require("next");
const express = require("express");

const nextServer = next();
const handle = nextServer.getRequestHandler();
// TODO: change before build
const port = 4001;

nextServer.prepare().then(() => {
  const expressApp = express();
  expressApp.get("*", (req, res) => {
    return handle(req, res);
  });
  expressApp.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on port ${port}`);
  });
});
