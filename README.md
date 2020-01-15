> 🚧 rollup-plugin-mjml is still in development. Will be out soon.

<div class="text-xs-center" align="center" style="margin: 20px">
  <img src="https://user-images.githubusercontent.com/9211670/72424331-170b8e00-3786-11ea-9792-9168ee5aafec.png">
</div>

## Install

## Usage

```
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
Default: `dist`

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should operate on. By default all files are targeted.


## License

The ISC License (ISC). Please see [License File](https://github.com/daankauwenberg/rollup-plugin-mjml/license) for more information.