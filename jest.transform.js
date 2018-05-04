const babelOptions = {
  "presets": ["env", "react"],
  "plugins": ["transform-object-rest-spread"]
};

module.exports = require('babel-jest').createTransformer(babelOptions);
