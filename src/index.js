import { createFilter } from '@rollup/pluginutils';
import { promises as fsPromises } from 'fs';
import mjml2html from 'mjml';

const defaults = {
  outputDir: 'dist',
  include: null,
  exclude: null,
}

export default function mjml(opts = {}) {
  const templates = [];
  const options = Object.assign({}, defaults, opts);
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'mjml',

    transform(code, id) {
      if (!filter(id) || !id.endsWith('.mjml')) return null;
      templates.push(id);
      return '';
    },

    async generateBundle(opts, bundle) {
      await fsPromises.mkdir('testfolder', { recursive: true });
      console.log({opts, bundle, options, templates});
      // const htmlOutput = mjml2html(code, { validationLevel: 'strict' });
      // console.log(htmlOutput);
    }
  }
}