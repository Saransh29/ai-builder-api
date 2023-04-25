const whitelist = [
  "http://localhost:3000",
  "https://ai-builder-git-testing-saransh29.vercel.app",
  "https://www.ai-builder.live",
  "https://main.d1o2dmhg3w7pah.amplifyapp.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = corsOptions;
