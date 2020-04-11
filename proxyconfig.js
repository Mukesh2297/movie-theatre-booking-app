module.exports = {
  "/": {
    target: "http://1a5c46d6.ngrok.io",
    // target: "http://localhost:3000",
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
