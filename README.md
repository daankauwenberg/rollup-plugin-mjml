<div class="text-xs-center" align="center" style="margin: 20px">
  <img src="https://user-images.githubusercontent.com/9211670/72424331-170b8e00-3786-11ea-9792-9168ee5aafec.png">
</div>

## Install

```bash
npm install rollup-plugin-mjml --save-dev
```
## Usage

Add `mjml()` to your `rollup.config.js` file.

```js
// rollup.config.js
import mjml from 'rollup-plugin-mjml';

export default {
  ...
  plugins:[
    mjml()
  ]
}
```

After configuring you need to include the .mjml template files in your bundle. You can use either option:

#### Importing in JS

Easiest withouth extra dependencies is to import the templates in your Javascript:

```js
// main.js
import './mailtemplate.mjml`
```

#### Using @rollup/plugin-multi-entry

Alternatively, you can use Rollup's own plugin [multi-entry](https://github.com/rollup/plugins/tree/master/packages/multi-entry) to have multiple entry files and include them with something like `input: ['src/main.js', 'src/mail/**/*.mjml']`.

```js
// rollup.config.js
import multi from '@rollup/plugin-multi-entry';
import mjml from 'rollup-plugin-mjml';

{
  input: ['src/main.js', 'src/mail/**/*.mjml'],
  plugins: [multi(), mjml()],
  //...
}
```

## Options

Options can be added as parameter to the plugin, for example:

```js
// rollup.config.js
//...
  plugins: [
    mjml({
      outputDir: 'dist/mail',
      validationLevel: 'strict',
    })
  ]
//...
```

### `outputDir`
Type: `String`<br>
Default: _Same location as where the bundle is exported_

A relative path from where Rollup is initiated, e.g. `dist/email`.

### `outputExt`
Type: `String`<br>
Default: `html`

The extension can be changed to fit needs e.g. twig. This only changes the filename, no other rendering is done. Language specific logic could be placed in `mj-raw` tags.

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should operate on. By default all files are targeted.

### MJML Options

Additionally the MJML options can be added to the top level of the options object. More information can be found in the [MJML Documentation](https://mjml.io/documentation/#inside-node-js). In short, following options can be added:

- `fonts`
- `keepComments`
- `beautify`
- `minify`
- `validationLevel`
- `filePath`
- `mjmlConfigPath`
- `minifyOptions`
- `juicePreserveTags`

## License

The ISC License (ISC). Please see [License File](https://github.com/daankauwenberg/rollup-plugin-mjml/blob/master/LICENSE) for more information.