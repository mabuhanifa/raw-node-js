const http = require("http");
const url = require("url");

class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {},
    };
  }

  get(path, callback) {
    this.routes.GET[path] = callback;
  }

  post(path, callback) {
    this.routes.POST[path] = callback;
  }

  put(path, callback) {
    this.routes.PUT[path] = callback;
  }

  delete(path, callback) {
    this.routes.DELETE[path] = callback;
  }

  handle(req, res) {
    const method = req.method.toUpperCase();
    const path = req.url;

    const routeHandler = this.routes[method][path];
    if (routeHandler) {
      routeHandler(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
}

class MiniExpress {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {},
    };
    this.middleware = [];
  }

  use(callback) {
    this.middleware.push(callback);
  }

  get(path, callback) {
    this.routes.GET[path] = callback;
  }

  post(path, callback) {
    this.routes.POST[path] = callback;
  }

  put(path, callback) {
    this.routes.PUT[path] = callback;
  }

  delete(path, callback) {
    this.routes.DELETE[path] = callback;
  }

  useRouter(prefix, router) {
    for (const method in router.routes) {
      for (const path in router.routes[method]) {
        this.routes[method][prefix + path] = router.routes[method][path];
      }
    }
  }

  parseBody(req, callback) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        req.body = {};
      }
      callback();
    });
  }

  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toUpperCase();
    const query = parsedUrl.query;
    const headers = req.headers;

    req.query = query;
    req.headers = headers;

    const runMiddleware = (index) => {
      if (index < this.middleware.length) {
        this.middleware[index](req, res, () => {
          runMiddleware(index + 1);
        });
      } else {
        const routeHandler = this.routes[method][path];
        if (routeHandler) {
          if (method === "POST" || method === "PUT") {
            this.parseBody(req, () => {
              routeHandler(req, res);
            });
          } else {
            routeHandler(req, res);
          }
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Route not found" }));
        }
      }
    };

    runMiddleware(0);
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });
    server.listen(port, callback);
  }
}
module.exports = () => new MiniExpress();
module.exports.Router = () => new Router();
