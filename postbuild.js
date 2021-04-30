const { exec } = require('child_process');

const run = command => {
  return new Promise((resolve, reject) => {
    exec(command, err => {
      if (err) reject(err);

      resolve();
    });
  });
};

(async () => {
  await run('cp ./dist/prime.cjs.production.min.js ./dist/index.js');
  await run('cp ./dist/prime.cjs.production.min.js.map ./dist/index.js.map');
  await run('rm -rf ./dist/prime.*');
})();
