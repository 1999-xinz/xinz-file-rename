import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// 默认当前目录下的target目录, 支持绝对路径
const DEFAULT_TARGET_DIR = path.join(__dirname, 'target');

/**
 * 重命名文件
 */
async function renameFiles(): Promise<void> {
  const targetDir = DEFAULT_TARGET_DIR; // 目标目录

	// 获取目录合集
	let dirs;
	try {
		dirs = await fs.promises.readdir(targetDir);

		// 去除macos系统下的DS_Store文件
		dirs = dirs.filter(dir => dir !== '.DS_Store');
	} catch (error) {
		throw new Error('Error reading files');
	}

  for await (const dir of dirs) {
    const dirPath = path.join(targetDir, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      let files = await fs.promises.readdir(dirPath);
      files = files.sort((a, b) => {return parseInt(a) - parseInt(b)});

      for (let i = 0; i < files.length; i++) {
        const oldFilePath = path.join(dirPath, files[i]);
        const fileExt = path.extname(files[i]);
        const newFileName = `${dir}-${1 + i}${fileExt}`;
        const newFilePath = path.join(dirPath, newFileName);

        fs.renameSync(oldFilePath, newFilePath);
      }
    }
  }
}

// Usage example
const main = async () => {
	await renameFiles();

	console.log(chalk.green('All files renamed successfully'));
};

main();
