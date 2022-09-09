import {
  BaseGenerator,
  installWithNpmClient,
  prompts,
  yParser
} from '@umijs/utils';
import { join, basename } from 'path';

interface Options {
  args: yParser.Arguments;
  cwd: string;
}

export default async function createWhiskey({ args, cwd }: Options) {
  const [name = basename(cwd)] = args._;
  const target = name ? join(cwd, name + '') : cwd;
  const registry = 'https://registry.npmjs.org/';
  const { version } = require('../package.json');
  const { npmClient } = await prompts(
    [
      {
        type: 'select',
        name: 'npmClient',
        message: 'Pick NPM client',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'cnpm', value: 'cnpm' },
          { title: 'tnpm', value: 'tnpm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'pnpm', value: 'pnpm' }
        ],
        initial: 4
      }
    ],
    {
      onCancel() {
        process.exit(1);
      }
    }
  );

  const generator = new BaseGenerator({
    path: join(__dirname, '../template'),
    target,
    data: {
      version: version.includes('-canary.') ? version : `^${version}`,
      npmClient,
      registry
    },
    questions: [
      {
        name: 'name',
        type: 'text',
        message: `Input NPM package name`
      },
      {
        name: 'description',
        type: 'text',
        message: `Input NPM package description`
      },
      {
        name: 'author',
        type: 'text',
        message: `Input NPM package author (Name <email@example.com>)`
      }
    ]
  });
  await generator.run();
  // install
  installWithNpmClient({ npmClient, cwd: target });
}
