module.exports = {
  "presets": [
    ["@babel/preset-env", {
        "targets": {
          "esmodules": true
        },
        "modules":false
      }
    ],
    "@babel/preset-typescript",
    "minify"
  ],
  "plugins": []
};