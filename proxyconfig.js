module.exports = {
  "/api": {
    target: "https://theatreapi.saileshkumar.com",
    // target: "http://localhost:3000",
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "localhost",
    debug: true,
    pathRewrite: function (path, req) {
      return path.replace("/api", "");
    },
    onProxyRes: (proxyResponse) => {
      if (proxyResponse.headers["set-cookie"]) {
        const cookies = proxyResponse.headers["set-cookie"].map((cookie) => {
          return cookie.replace(/; secure; SameSite=None/gi, "");
        });
        proxyResponse.headers["set-cookie"] = cookies;
      }
    },
  },
};
