# important projects

1. [https://github.com/async-labs/saas.git]
2. run `yarn create next-app --example with-mobx with-mobx-app`
3. [explanation on how to initialize the stores](https://www.themikelewis.com/post/nextjs-with-mobx)

# TODOs:

1. Change the `.env` files to work with the "react" dot-env options
2. use [styled-jsx](https://github.com/zeit/styled-jsx) - WE WON'T USE THIS ⛔️
3. use [preset-env](https://babeljs.io/docs/en/babel-preset-env) in order to use `.browserslistrc` - ✅

# Debug

1. [launch.json](./Resources/README_LAUCH.json)

# how to use stores?

# add this snippet in order to quick create Page
<br> press `ctrl+p` --> write this:
<br>`> configure user snippet` - Pay attention for the "`>`"!!!
<br> add snippet:
```
"NextJs Page": {
  "prefix": "tscrpage",
  "body": [
    "import * as React from 'react';",
    "",
    "const $1 = () => {",
    "	return (",
    "		$2",
    "	);",
    "};",
    "",
    "$1.getInitialProps = async () => {",
    "	return {};",
    "};",
    "",
    "export default $1;"
  ]
}
```
