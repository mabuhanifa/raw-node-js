/*
Title: UpTime Monitoring  Application
Author: Mohammed Abu Hanifa
Date: 2023-03-15
Description: A RESTfull API for upTime monitoring
*/

const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

const app = {};

app.config = {
  port: 3000,
};

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Listening on port ${app.config.port}`);
  });
};

app.handleReqRes = handleReqRes;

app.createServer();
