# ToWebpack
this is a react webpack

## 支持语法

  react语法

  es6以及更高级语法

## 更新

- 添加支持ts语法的配置    2019-7-25-16:40

## ！！！！

- 通过externals将比较大的包引入可以减少打包体积，但是需要在index.html中使用cdn的方式引入

- https://www.bootcdn.cn/

## 关于ts解析import导入模块是报错

- 这是一个历史性问题，因为之前对于es module的实现没有一个事实标准，然后babel的实现和ts的不一样，一般情况下，如果你写的库是为nodejs 准备的，那么就开启这个，如果是webpack打包的也可以开启它，没有很好方式能解决这个问题，所以写ts的习惯是，import * as xxx from xxx 这样的方式来导模块。


"dependencies": {
    "@babel/cli": "^7.5.0",
    "@babel/core": "^7.5.4",
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/plugin-proposal-decorators": "^7.4.4",
    "@babel/plugin-transform-classes": "^7.5.5",
    "@babel/plugin-transform-runtime": "^7.5.5",
    "@babel/preset-env": "^7.5.4",
    "@babel/preset-react": "^7.0.0",
    "@babel/preset-typescript": "^7.3.3",
    "@babel/runtime": "^7.5.5",
    "@types/node": "^12.12.14",
    "@types/webpack": "^4.41.0",
    "antd": "^3.20.6",
    "antd-mobile": "^2.2.14",
    "autoprefixer": "^9.6.1",
    "babel-loader": "^8.0.6",
    "babel-plugin-import": "^1.12.0",
    "babel-preset-react": "^6.24.1",
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^5.0.4",
    "css-loader": "^3.0.0",
    "file-loader": "^4.1.0",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.12.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "progress-bar-webpack-plugin": "^1.12.1",
    "react": "^16.8.6",
    "react-dev-utils": "^9.0.1",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "ts-node": "^8.5.4",
    "typescript": "^3.5.3",
    "uglifyjs-webpack-plugin": "^2.1.3",
    "url-loader": "^2.1.0",
    "video-react": "^0.14.1",
    "webpack": "^4.35.2",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2",
    "webpack-merge": "^4.2.1"
  },

  "devDependencies": {
    "@types/react": "^16.8.24",
    "@types/react-dom": "^16.8.5",
    "eslint-plugin-react-hooks": "^2.0.1"
  }
