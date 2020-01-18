import test from 'ava';
import { rollup } from 'rollup';
import { promises as fsPromises } from 'fs';

import mjml from '../src';

const getCode = async (bundle, outputOptions) => {
  const { output } = await bundle.generate(outputOptions || { format: 'esm' });
  return output;
};

const defaultConf = {
  input: `./test/fixtures/template.mjml`,
  output: {
    format: 'esm',
    dir: 'output'
  },
  plugins: [mjml()]
}

// Imported by JS
test('exports when imported in Javascript', async (t) => {
  t.plan(2);
  const bundle = await rollup(Object.assign({}, defaultConf, {input: './test/fixtures/entry.js'}));
  const output = await getCode(bundle ,defaultConf.output);
  t.is(output.length, 2);
  t.snapshot(output[1].source);
});

// Direct input
test('exports with .mjml input', async (t) => {
  const bundle = await rollup(defaultConf);
  const output = await getCode(bundle ,defaultConf.output);
  t.snapshot(output[1].source);
});

// Can configure extension
test('sets a non default file extension', async (t) => {
  const testExtension = 'twig';
  const bundle = await rollup(Object.assign({}, defaultConf, {plugins: [mjml({outputExt: testExtension})]}));
  const output = await getCode(bundle ,defaultConf.output);
  t.true(output[1].fileName.endsWith(testExtension));
});