/** @type {import("next").NextConfig} */
const { i18n } = require("./next-i18next.config");
const packageVersion = require("./package.json").version;

module.exports = {
  i18n,
  reactStrictMode: false,
  env: {
    APP_VERSION: packageVersion
  }
};
