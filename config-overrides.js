const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // 在webpack中禁用eslint
  disableEsLint(),

  // 添加webpack别名
  addWebpackAlias({
    // 添加路径对@符号的支持
    ["@"]: path.resolve("./src"),
  })
);