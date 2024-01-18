import dirTree from 'directory-tree';
import path from 'path';
import fs from 'node:fs';

const printDir = (dir, depth = 0, currDir = '') => {
  let prevDir = null;
  dir.forEach((element) => {
    if (
      element.name !== 'node_modules' &&
      element.name !== '.github' &&
      element.children?.length > 0
    ) {
      printDir(element.children, depth + 1, element.path);
    } else {
      if (path.extname(element.name) === '.md') {
        const spacesDir = ' '.repeat(depth * 2 -  1);
        const spacesFile = ' '.repeat(depth * 2 + 1);
        if (currDir !== '' && currDir !== prevDir && currDir !== '.') {
          const content = `${spacesDir}- __${currDir}__\n`;
          console.log(content);
          fs.appendFileSync('INDEX.md', content, err => {
            if (err) {
              console.error(err);
            }
            // done!
          });
        }
        const content = `${spacesFile}- [${element.name}](${element.path})\n`;
        console.log(content);
        fs.appendFileSync('INDEX.md', content, err => {
          if (err) {
            console.error(err);
          }
          // done!
        });
        prevDir = currDir;
      }
    }
  });
};

fs.writeFileSync('INDEX.md', '# Automatic generated documentation tree of `attempt-api` project \n');
const tree = dirTree('.', { extensions: /\.md$/ });

printDir([tree]);
