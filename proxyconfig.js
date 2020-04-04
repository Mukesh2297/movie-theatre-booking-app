module.exports = {
  "/": {
    target: "https://theatreapi.saileshkumar.com",
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "localhost",
    debug: true,
    onProxyRes: proxyResponse => {
      if (proxyResponse.headers["set-cookie"]) {
        const cookies = proxyResponse.headers["set-cookie"].map(cookie => {
          return cookie.replace(/; secure; SameSite=None/gi, "");
        });
        proxyResponse.headers["set-cookie"] = cookies;
      }
    }
  }
};