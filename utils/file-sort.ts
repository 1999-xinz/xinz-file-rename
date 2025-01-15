/**
 * 资源文件名数组排序（从小到大）
 * @param files 文件名数组
 * @returns 
 */
export const fileSort = (files: string[]) => {
  files.sort((a, b) => {
    const numA = parseInt(a.slice(0, a.lastIndexOf('.')));
    const numB = parseInt(b.slice(0, b.lastIndexOf('.')));
    return numA - numB;
  });

  return files;
}

export default {
  fileSort
}