import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'node_modules', '@3d-dice', 'dice-themes', 'themes');
const destPublicDir = path.join(process.cwd(), 'public', 'assets', 'themes');
const destDistDir = path.join(process.cwd(), 'dist', 'assets', 'themes');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const srcElement = path.join(from, element);
    const destElement = path.join(to, element);
    if (fs.lstatSync(srcElement).isDirectory()) {
      copyFolderSync(srcElement, destElement);
    } else {
      fs.copyFileSync(srcElement, destElement);
    }
  });
}

console.log('Copying themes from:', srcDir);
if (fs.existsSync(srcDir)) {
  copyFolderSync(srcDir, destPublicDir);
  console.log('Successfully copied to public themes:', destPublicDir);
  
  if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
    copyFolderSync(srcDir, destDistDir);
    console.log('Successfully copied to dist themes:', destDistDir);
  }
} else {
  console.error('Source themes directory not found in node_modules!');
}
