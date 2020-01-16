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
  const ids = [];
  const options = Object.assign({}, defaults, opts);
  const filter = createFilter(options.include, options.exclude);
  // MJML Options
  const mjmlOptions = JSON.parse(JSON.stringify(options));
  Object.keys(mjmlOptions).forEach(key => { if (!mjmlWhitelist.includes(key)) delete mjmlOptions[key]; });

  function generateTemplate(id) {
    const mjmlErrorMessage = (error) => `Line ${error.line} of ${id} (${error.tagName}) - ${error.message}`;
    return new Promise(async (resolve, reject) => {
      try {
        // Read the file's content and get the path object
        const [mjmlCode, file] = await Promise.all([
          fsPromises.readFile(id, {encoding: 'utf8'}),
          path.parse(id)
        ]);
        
        // Render the mjml syntax
        let htmlOutput;
        try {
          htmlOutput = mjml2html(mjmlCode, mjmlOptions);
        } catch(e) {
          // If validationLevel is strict (error is thrown), format the error and abort bundling.
          e.errors.map(error => error.formattedMessage = mjmlErrorMessage(error));
          e.message = e.errors[0].formattedMessage;
          this.error(e);
        }

        // Log any errors as warning
        htmlOutput.errors.forEach(error => this.warn(mjmlErrorMessage(error)));
        
        if (options.outputDir) {
          // Write the templates
          await fsPromises.writeFile(`${options.outputDir}/${file.name}.${options.outputExt}`, htmlOutput.html);
        } else {
          // Print to stdout
          console.log(htmlOutput.html);
        };
        resolve();
      } catch(e) {
        reject(e);
      }
    });
  };

  return {
    name: 'mjml',

    transform(code, id) {
      if (!filter(id) || !id.endsWith('.mjml')) return null;
      ids.push(id);
      return '';
    },

    async generateBundle(opts, bundle) {
      try {
        // Set the outputDir
        options.outputDir = 
          options.outputDir ? options.outputDir
            : opts.dir ? opts.dir
              : opts.file ? path.parse(opts.file).dir
                : null;
        if (options.outputDir) await fsPromises.mkdir(options.outputDir, { recursive: true });
        await Promise.all(ids.map(id => generateTemplate.call(this, id)));
      } catch(e) {
        this.error(e);
      }
    }
  }
}