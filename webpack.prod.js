const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  performance: {
    // Silence the warning about large files
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
});
