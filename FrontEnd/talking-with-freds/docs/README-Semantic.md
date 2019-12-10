## Semantic-UI

Semantic is a development framework that helps create beautiful, responsive layouts using react.
[Semantic UI react](https://react.semantic-ui.com/)

**semantic-ui install**
[Semantic UI react - Get Started](https://react.semantic-ui.com/usage)

1. To install Components: `yarn add semantic-ui-react`
   example:

   ```
   import React from 'react'
   import { Button } from 'semantic-ui-react'

   const ButtonExampleButton = () => <Button>Click Here</Button>

   export default ButtonExampleButton
   ```

2. To install Theme: `yarn add semantic-ui --dev` or `npm i semantic-ui --dev`

**semantic-ui Theming install**
[Semantic UI react - Theming](https://react.semantic-ui.com/theming)

1. Install Craco and Less: `yarn add @craco/craco craco-less cpy-cli semantic-ui-less --dev`
2. Update `package.json` file:
   `"scripts": { "start": "craco start", "build": "craco build", "test": "craco test", }`
3. Create `craco.config.js` file and add:

   ```
   const {
   getLoader,
   loaderByName,
   throwUnexpectedConfigError,
   } = require('@craco/craco')
   module.exports = {
   webpack: {
       alias: {
       '../../theme.config$': require('path').join(
           __dirname,
           '/src/semantic-ui/theme.config',
       ),
       },
   },
   plugins: [
       { plugin: require('craco-less') },
       {
       plugin: {
           overrideWebpackConfig: ({ context, webpackConfig }) => {
           const { isFound, match: fileLoaderMatch } = getLoader(
               webpackConfig,
               loaderByName('file-loader'),
           )

           if (!isFound) {
               throwUnexpectedConfigError({
               message: `Can't find file-loader in the ${
                   context.env
               } webpack config!`,
               })
           }

           fileLoaderMatch.loader.exclude.push(/theme.config$/)
           fileLoaderMatch.loader.exclude.push(/\.variables$/)
           fileLoaderMatch.loader.exclude.push(/\.overrides$/)

           return webpackConfig
           },
       },
       },
   ],
   }
   ```

4. Copy necessary files:
   `yarn cpy node_modules/semantic-ui-less/_site/**/* src/semantic-ui/site`
   `yarn cpy node_modules/semantic-ui-less/theme.config.example src/semantic-ui --rename=theme.config`

5. Update `theme.config` file(`src/semantic-ui/theme.config`):

   ```
   /*******************************
           Folders
   *******************************/

   @themesFolder : 'themes';
   @siteFolder  : '../../src/semantic-ui/site';

   @import (multiple) "~semantic-ui-less/theme.less";
   @fontPath : '../../../themes/@{theme}/assets/fonts';
   ```

6. Add to `index.tsx`: `import 'semantic-ui-less/semantic.less'`

**That's it!!!**
Now you can add and change colors to your Components.
example:

<!-- TODO: Itay - where we should change this variable? -->
`@primaryColor: #002f4e; @pageBackground: #eff0f1;`
