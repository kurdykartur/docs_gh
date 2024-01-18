import dirTree from 'directory-tree';
import path from 'path';

path.extname('index.html');
const printDir = (dir, depth = 0, currDir = '') => {
  let prevDir = null;
  // let prevSharedPath = null;
  dir.forEach((element) => {
    if (
      element.name !== 'node_modules' &&
      element.children &&
      element.children.length &&
      element.children.length > 0
    ) {
      printDir(element.children, depth + 1, element.path);
    } else {
      if (path.extname(element.name) === '.md') {
        const spacesDir = ' '.repeat(depth * 2 + 1);
        const spacesFile = ' '.repeat(depth * 2 + 3);
        if (currDir !== '' && currDir !== prevDir) {
          console.log(`${spacesDir}- __${currDir}__`);
        }
        console.log(`${spacesFile}- [${element.name}](${element.path})`);
        prevDir = currDir;
      }
    }
  });
};

const tree = dirTree('./attempt', { extensions: /\.md$/ });

console.log(tree);

printDir([tree]);
