const babelOptions = {
  "presets": ["env", "react"],
  "plugins": ["transform-object-rest-spread", "transform-class-properties"]
};

module.exports = require('babel-jest').createTransformer(babelOptions);
