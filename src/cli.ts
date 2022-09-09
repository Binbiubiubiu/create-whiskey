import { yParser } from '@umijs/utils';
import createWhiskey from '.';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h']
  }
});

if (args.version && !args._[0]) {
  const { name, version } = require('../package.json');
  console.log(`${name}@${version}`);
} else {
  createWhiskey({ args, cwd: process.cwd() }).catch(console.error);
}
