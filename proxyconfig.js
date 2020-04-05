module.exports = {
  "/": {
    target: "https://theatreapi.saileshkumar.com",
    // target: "http://localhost:3000",
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "localhost",
    debug: true,
    onProxyRes: (proxyResponse) => {
      if (proxyResponse.headers["set-cookie"]) {
        const cookies = proxyResponse.headers["set-cookie"].map((cookie) => {
          let newCookie;
          newCookie = cookie.replace(/; secure/gi, "");
          newCookie = cookie.replace(/; SameSite=None/gi, "");
          return newCookie;
        });
        proxyResponse.headers["set-cookie"] = cookies;
      }
    },
  },
};
