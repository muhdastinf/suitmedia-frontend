module.exports = {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "https://suitmedia-backend.suitdev.com/api/:path*",
        },
      ];
    },
    images: {
      domains: ["suitmedia-backend.suitdev.com"],
    },
  };
  