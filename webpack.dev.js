const ExtReloader = require("webpack-ext-reloader");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  watch: true,
  devtool: false,
  plugins: [
    new ExtReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        contentScript: "content-script",
      },
    }),
  ],
});
