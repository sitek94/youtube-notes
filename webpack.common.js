const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "content-script": "./src/content-script.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/manifest.json",
        },
        {
          from: "./src/images",
          to: "images",
        },
      ],
    }),
  ],
};
