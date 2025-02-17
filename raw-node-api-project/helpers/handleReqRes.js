const handler = {};
const url = require("url");
const { StringDecoder } = require("string_decoder");

handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  req.on("data", (data) => {
    realData += decoder.write(data);
  });
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    console.log(method, { trimmedPath }, { queryStringObject, headersObject });
    res.end("Hello World");
  });
};

module.exports = handler;
