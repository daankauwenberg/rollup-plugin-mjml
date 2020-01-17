import { createFilter } from '@rollup/pluginutils';
import { promises as fsPromises } from 'fs';
import path from 'path';
import mjml2html from 'mjml';

const defaults = {
  outputDir: null,
  outputExt: 'html',
  include: null,
  exclude: null,
}

const mjmlWhitelist = ['fonts', 'keepComments', 'beautify', 'minify', 'validationLevel', 'filePath', 'juicePreserveTags', 'minifyOptions', 'mjmlConfigPath'];

export default function mjml(opts = {}) {
  const templateSet = new Set();
  const options = Object.assign({}, defaults, opts);  
  const filter = createFilter(options.include, options.exclude);

  // MJML Options
  const mjmlOptions = Object.assign({}, options);
  Object.keys(mjmlOptions).forEach(key => { if (!mjmlWhitelist.includes(key)) delete mjmlOptions[key]; });

  return {
    name: 'mjml',

    async load(id) {
      if (!filter(id) || !id.endsWith('.mjml')) return;

      const [content, file] = await Promise.all([
        fsPromises.readFile(id, {encoding: 'utf-8'}),
        path.parse(id)
      ]).catch(e => this.error(e));

      // MJML to HTML
      let htmlOutput;
      const mjmlErrorMessage = (error) => `Line ${error.line} of ${id} (${error.tagName}) - ${error.message}`;
      try {
        htmlOutput = mjml2html(content, mjmlOptions);
      } catch(e) {
        // If validationLevel is strict (error is thrown), format the error and abort bundling.
        e.errors.map(error => error.formattedMessage = mjmlErrorMessage(error));
        e.message = e.errors[0].formattedMessage;
        this.error(e);
      }
      htmlOutput.errors.forEach(error => this.warn(mjmlErrorMessage(error)));

      // Emit to an additional file
      const fileName =`${file.name}.${options.outputExt}`
      this.emitFile({
        type: 'asset',
        fileName,
        source: htmlOutput.html
      });
      
      // A set used for reference in generateBundle
      templateSet.add(fileName);

      // Rollup expects JavaScript. 
      return {
        code: '',
      };
    },

    async generateBundle(outputOptions, bundles) {
      for(const bundleId of Object.keys(bundles)) {
        const bundle = bundles[bundleId];
        if (!templateSet.has(bundleId)) {
          // Not a loaded MJML file.
          continue;
        }
        if(!options.outputDir){
          // Export to the rollup output config location.
          continue;
        }
        try {
          await fsPromises.mkdir(options.outputDir, { recursive: true });
          await fsPromises.writeFile(`${options.outputDir}/${bundle.fileName}`, bundle.source);
          // Prevent being emitted
          delete bundles[bundleId];
        } catch(e) {
          this.error(e);
        }
      }
    }
  }
}