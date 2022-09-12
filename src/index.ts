import {
  BaseGenerator,
  installWithNpmClient,
  prompts,
  yParser
} from '@umijs/utils';
import { join, basename } from 'path';
import { getGitUser } from './util';

interface Options {
  args: yParser.Arguments;
  cwd: string;
}

/**
 * @public
 */
async function createWhiskey({ args, cwd }: Options) {
  const [name = basename(cwd)] = args._;
  const target = name ? join(cwd, name + '') : cwd;
  const registry = 'https://registry.npmjs.org/';
  const { version } = require('../package.json');
  const gitUser = await getGitUser();
  const { npmClient } = await prompts(
    [
      {
        type: 'select',
        name: 'npmClient',
        message: 'Pick NPM client',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'pnpm', value: 'pnpm' }
        ],
        initial: 2
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
      addPackAction: npmClient === 'npm' ? 'install' : 'add',
      registry
    },
    questions: [
      {
        name: 'name',
        type: 'text',
        message: `Input NPM package name`,
        initial: name
      },
      {
        name: 'description',
        type: 'text',
        message: `Input NPM package description`,
        initial: 'The description of a vue component'
      },
      {
        name: 'author',
        type: 'text',
        message: `Input NPM package author (Name <email@example.com>)`,
        initial: gitUser
      }
    ]
  });
  await generator.run();
  // install
  installWithNpmClient({ npmClient, cwd: target });
}

export default createWhiskey;
