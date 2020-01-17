import test from 'ava';
import { rollup } from 'rollup';
import { promises as fsPromises } from 'fs';

import mjml from '../src';

// const getCode = async (bundle, outputOptions, allFiles = false) => {
//   const { output } = await bundle.generate(outputOptions || { format: 'cjs' });
//   if (allFiles) {
//     return output.map(({ code, fileName, source }) => {
//       return { code, fileName, source };
//     });
//   }
//   const [{ code }] = output;
//   return code;
// };

const output = { dir: 'output', format: 'esm' };

test('direct input', async (t) => {
  const conf = {
    input: `./test/fixtures/template.mjml`,
    output: {
      format: 'esm',
      dir: 'output'
    },
    plugins: [mjml()]
  }
  const bundle = await rollup(conf);
  const { output } = await bundle.generate(conf.output);
  console.log({output})
  // const code = await getCode(bundle, output, true);
  // console.log(code);
  t.true(true);
});