import util from 'util';
import childProcess from 'child_process';
import os from 'os';
const exec = util.promisify(childProcess.exec);

async function getGitConfig(key: string) {
  const config = await exec(`git config ${key}`);
  const r = config.stdout.replace(/[\n\r]/g, '');
  return r;
}

const dot2Camel = (str: string) =>
  str.split('.').reduce((s, it, i) => {
    if (i === 0) {
      return s + it;
    }
    const fw = it[0].toUpperCase();
    return s + fw + it.slice(1);
  }, '');

async function getGitConfigs(...keys: string[]) {
  return Promise.all(keys.map(getGitConfig)).then((values) => {
    return values.reduce((obj, it, i) => {
      const key = dot2Camel(keys[i]);
      obj[key] = it;
      return obj;
    }, {} as Record<string, string>);
  });
}

const format = (name: string, email: string) =>
  name + (email ? '<' + email + '>' : '');

(async () => {
  let { userEmail } = await getGitConfigs('user.name', 'user.email');
  let userName;
  if (!userName) {
    userName = os.userInfo().username;
  }

  const msg = format(userName, userEmail);
  process.send?.(msg);
})();
