import { fork } from 'child_process';
import path from 'path';

export function getGitUser(): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = fork(path.resolve(__dirname, 'get-git-user.js'), []);
    child.on('message', (data: string) => {
      resolve(data);
    });
    child.on('error', (err) => {
      reject(err);
    });
  });
}
