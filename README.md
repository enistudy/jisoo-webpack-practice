# FE boilerplate

> webpack을 이용하여 React 개발환경을 처음부터 설정해보는 저장소입니다.

<br>

## ❓ module in browser

서버에서 처리하는 로직을 프론트로 옮기는 경우가 많아지면서, 프론트엔드에서 자바스크립트로 작성해야 하는 코드의 양이 증가하고 있습니다. 작성해야 하는 코드의 양이 많아지면 이를 효율적으로 관리해야 할 필요가 있습니다. 여러 개의 파일을 브라우저에서 로딩할 수 있지만, 이는 여러 번의 네트워크 요청을 해야하는 단점이 있을 뿐 아니라 각각의 파일이 서로의 스코프를 침범할 수 있는 문제가 있습니다.

이러한 문제를 해결하기 위해 RequireJS 같은 모듈 로더를 이용하여 모듈 시스템을 적용하려는 시도가 있었습니다. 하지만, 모듈 로더는 런타임에 필요한 모듈을 서버로부터 다운받는 과정을 필요로 하므로 네트워크 비용이 발생한다는 단점이 존재합니다.

이를 대체하기 위해 등장한 것이 모듈 번들러입니다. 모듈 번들러는 빌드 타임에 동작하며, 여러 개의 모듈을 하나의 파일 혹은 여러개의 파일(chunk)로 번들하여 제공하는 것을 도와주는 도구입니다. 초기에 하나의 파일만 로딩하면 런타임에 모듈을 사용할 때 추가적인 네트워크 요청을 할 필요가 없게 됩니다. 많은 양의 모듈이 번들링 된 파일을 로딩할 경우 초기 로딩 속도가 증가하는 단점이 있지만, 적절한 개수의 파일로 번들링되는 파일을 분리하면 어느정도 해결이 가능합니다.

### 👍 참고자료

- https://d2.naver.com/helloworld/0239818
- https://d2.naver.com/helloworld/12864
- https://ayonc.tistory.com/136
- https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/

<br>

## ❓ webpack

> webpack is a static module bundler for modern JavaScript applications.

webpack은 대표적인 모듈 번들러중의 하나입니다. 공식 document에는 [webpack의 주요개념](https://webpack.js.org/concepts/)에 대해 설명하고 있습니다.

> Entry, Output, Loaders, Plugins

```bash
# install
yarn add webpack webpack-cli -D
```

### 📌 Entry

webpack은 모든 파일을 모듈이라고 합니다. 하나의 애플리케이션에서 모듈들은 서로 의존할 수 밖에 없고 webpack에서는 이 의존성을 표현한 의존성 그래프가 존재합니다. 이 의존성 그래프에서 bundling의 시작점을 entry라고 합니다.

webpack 설정파일에서 기본적으로 다음과 같이 설정할 수 있습니다.

```js
module.exports = {
	entry: {
		main: "./src/index.js"
	}
};
```

여러 개의 entry가 필요하거나 추가적인 설정을 할 수 있습니다.(document 참고 - https://webpack.js.org/concepts/entry-points/)

> 설정 참고 링크 https://webpack.js.org/configuration/entry-context/

#### 👏 context

모듈들이 존재하는 절대경로를 configuration 파일에 context를 추가하여 설정할 수 있습니다.

```js
module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		main: "./index.js"
	}
};
```

다음과 같은 이유로 설정하는 것을 추천한다고 합니다.

> By default the current directory is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from CWD (current working directory).

<br>

### 📌 Output

엔트리에 명시한 파일을 시작으로 번들링된 결과물의 위치를 설정하는 속성입니다.

```js
module.exports = {
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].bundle.js" // [name]에 들어갈 내용은 entry에서 key값으로 설정한 값 입니다.
	}
};
```

파일이 위치할 디렉토리와 파일의 이름을 명시만하면 간단히 설정할 수 있습니다. MPA 프로젝트를 구성하거나 코드 스플리팅을 이용할 경우 추가적인 설정을 해주어야 합니다.

> 설정 참고 링크 https://webpack.js.org/configuration/output/

<br>

### 📌 Loaders

webpack은 자바스크립트와 JSON파일만 읽을 수 있습니다. 그렇기 때문에 이미지, css, 폰트 등 다양한 파일들을 webpack에서 읽을 수 있는 모듈로 변환하기 위해서 loader를 사용해야 합니다.

loader는 두개의 속성으로 구성된 객체이며 각각 다음과 같습니다.

```
test - loader를 적용할 파일, 정규식으로 해당 확장자명을 가지는 모든 파일들을 loader에 적용시키게 할 수 있다.
use - 적용할 loader
```

ES6로작성된 js파일을 ES5로 변환하기 위해 babel-loader를 설정해야 합니다.

```bash
# install
yarn add babel-loader @babel/core -D
```

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
		]
	}
};
```

css 파일을 사용하기 위해서는 css-loader와 style-loader를 사용해야 합니다. css-loader는 css파일은 js코드로 변환해주는 역할을 하고 style-loader는 js로 변환된 css를 동적으로 돔에 추가할 수 있게 도와주는 역할을 한다.

```bash
# install
yarn add style-loader css-loader -D
```

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.(css)$/,
				use: ["style-loader", "css-loader"]
			}
		]
	}
};
```

use 속성을 배열로 설정하면 loader chain으로 배열의 역순으로 loader가 실행됩니다.

#### 👏 file-loader & url-loader

file-loader는 말그대로 지정된 형식의 파일을 모듈로 변환해주는 loader이고, url-loader는 문자열 형태로 변환하여 모듈로 변환해주는 loader이다. 크기가 작은 파일의 경우 서버에 요청없이 문자열로 인코딩하여 사용하는 것이 더 효율적이므로 url-loader를 사용하곤 합니다.

```bash
# install
yarn add file-loader url-loader -D
```

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader",
				options: {
					publicPath: "./build/",
					name: "[name].[ext]?[hash]"
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: "url-loader",
					options: {
						name: "[name].[ext]?[hash]",
						publicPath: "./build/",
						limit: 10000
					}
				}
			}
		]
	}
};
```

> 설정 참고 링크
>
> - http://jeonghwan-kim.github.io/js/2017/05/22/webpack-file-loader.html
>
> - https://www.zerocho.com/category/Webpack/post/58ac2d6f2e437800181c1657

#### 👏 sass-loader

```bash
# install
yarn add sass-loader node-sass -D
```

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	}
};
```

<br>

### 📌 Plugins

loader가 각각의 모듈에 영향을 주는 기능을 한다면, plugin은 번들된 결과 전체에 대한 작업을 수행합니다.

자동으로 html파일을 생성해주는 `HTML Webpack Plugin`을 다음과 같이 사용할 수 있습니다.

```bash
# install
yarn add html-webpack-plugin -D
```

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public/index.html"),
			filename: path.join(__dirname, "build/index.html"),
			inject: true
		})
	]
};
```

template은 복사할 html파일이며 filename이 복사될 html파일의 이름입니다. inject를 통해 bundle된 js파일을 html에 추가할 수 있습니다.

#### 👏 dotenv-plugin

dotenv를 사용하기 위해서 plugin을 설정하는 것으로 간단히 해결할 수 있습니다.

```bash
# install
yarn add dotenv-webpack -D
```

```js
const DotenvPlugin = require("dotenv-webpack");

module.exports = {
	plugins: [new DotenvPlugin()]
};
```

이러고 코드에서 원래 사용하듯이 사용하면 끝입니다.

### 👍 참고자료

- https://webpack.js.org/concepts/
- http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html

<br>

## ❓ webpack으로 React 개발환경 설정

React로 작성된 코드를 브라우저에서 읽을 수 있도록 하기위해 ES5로 변환해주어야 합니다. babel이라는 도구를 사용하여 변환하는 작업, 트랜스파일링을 진행할 수 있습니다. babel을 사용하기위해서는 babel에 대한 설정을 명시한 babelrc파일을 작성해주어야 합니다.

```bash
# install
yarn add @babel/core @babel/polyfill @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties -D
```

```js
// .babelrc
{
	"presets": ["@babel/preset-env", "@babel/preset-react"],
	"plugins": ["@babel/plugin-proposal-class-properties"]
}
```

```js
// webpack.config.json
module.exports = {
	entry: { app: ["@babel/polyfill", "./index.js"] }
};
```

<br>

## ❓ devtool

원본 코드와 난독화된 코드를 매핑하여 디버깅에 도움을 주는 속성입니다. [잘 정리된 링크](https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance/)가 있어 참고하면 좋을 것 같습니다.

<br>

## ❓ devServer

개발 시, 파일이 변경될 때 마다 매번 빌드를 하고 확인하는 과정을 없애주기 위해 [devServer](https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html#webpack-dev-server) 설정을 추가할 수 있습니다.
설정에 [HMR](https://joshua1988.github.io/webpack-guide/devtools/hot-module-replacement.html)을 적용하면 파일이 변경될 때 마다 브라우저를 새로고침 할 필요가 없게 도와줍니다.

### 👍 참고자료

- https://velog.io/@jeff0720/React-개발-환경을-구축하면서-배우는-Webpack-기초

<br>

## ❓ 개발 - 배포 설정 파일 분리

development환경과 production 환경에 따라 config 파일을 분리할 수 있습니다. 분리함으로써 각각의 환경에 따라 플러그인을 추가하여 환경에 따른 설정파일을 관리할 수 있다는 장점이 있습니다.

> config 디렉토리에서 webpack config 파일들을 관리합니다. 공통이 되는 설정은 common 파일에서 관리하도록 합니다.

### 👍 참고자료

- https://meetup.toast.com/posts/153
- https://velog.io/@jeff0720/React-개발-환경을-구축하면서-배우는-Webpack-기초

## ❓ JEST + react-testing-library 를 이용한 test 환경 설정

```bash
# install
yarn add jest @testing-library/jest-dom @testing-library/react -D
```

```json
// package.json
{
	"jest": {
		"moduleDirectories": ["node_modules", "src"],
		"transform": {
			"\\.(js|jsx)?$": "babel-jest"
		},
		"moduleNameMapper": {
			"\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/test/__mocks__/fileMock.js"
		},
		"setupFilesAfterEnv": [
			"@testing-library/jest-dom/extend-expect",
			"@testing-library/react/cleanup-after-each"
		],
		"testPathIgnorePatterns": ["/node_modules/", "/public/"],
		"moduleFileExtensions": ["js", "json", "jsx", "node"]
	}
}
```

### 👍 참고자료

- https://dev.to/aromanarguello/getting-started-with-jest-react-testing-library-4nga
