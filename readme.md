# uxi-cli

jest + eslint + webpack + babel + webpack-dev-server

  - jest + enzyme + snapshot
  - eslint (airbnb)
  - webpack 4
  - webpack-dev-server
  - babel, babel-loader:
    - latest ('env')
    - react jsx
    - object spread

## install:
- npm i uxi-cli

print help:

`$ node_modules/.bin/uxi-cli`:


## Usage:

in the package.json:
```JSON
  "scripts": {
    "build": "uxi-cli build",
    "lint": "uxi-cli lint",
    "test": "uxi-cli test",
  }
```

## Commands:
  - **test**
  - **test:watch**
  - **test:coverage**
  - **lint**
  - **build**
  - **build:react**
  - **dev**


## Default behaviour:

- **test** scans a target directory (default to .src/) for files under a folder named *\_\_test\_\_* or files that end in *.test.js*

- **test** and **lint** default to targeting ./src folder, but you can say ortherwise by passing the path as the first argument:

  `$ uxi-cli lint ./myFolder` or `$ uxi-cli test ./source`

- **build** defaults to using ./src/index.js as source and .build/app.js as output

    To overwrire webpack config, or some part of it, create you config file:
    ```js
    // webpack.myconf.js
    const webpack = require('webpack');
    const path = require('path');

    module.exports = {
      entry: [
        './mySrcFolder/myEntryPoint.js',
      ],
      output: {
        path: path.join(__dirname, 'myOutputFolder'),
        filename: 'myOutputFileName.js',
      },
    };

    ```

    then use the config,

    `$ uxi-cli build --config webpack.myconf.js`


## Webpack dev-server:
  - create an index.html at the root of the project to be used by dev-server
  - webpack-dev-server contentBase default is '/'
