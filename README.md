> 🚧 rollup-plugin-mjml is still in development. Will be out soon.

<div class="text-xs-center" align="center" style="margin: 20px">
  <img src="https://user-images.githubusercontent.com/9211670/72424331-170b8e00-3786-11ea-9792-9168ee5aafec.png">
</div>

## Install

## Usage

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

## Options

### `outputDir`
Type: `String`<br>
Default: _Same location as where the bundle is exported_

The output directory is selected in the following order:<br> _Plugin configuration_ > _Rollup config output.dir_ > _Parsed directory from Rollup config output.file_ > _prints to stdout_.

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

#### MJML Options

Additionally the MJML options can be added. More information can be found in the [MJML Documentation](https://mjml.io/documentation/#inside-node-js). In short, following options can be added:

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