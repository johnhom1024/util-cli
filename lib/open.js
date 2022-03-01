#! /usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fsExtra = require('fs-extra');

// 配置文件信息
const projectInfoFileName = 'project-info.json';
const projectInfoJsonPath = './' + projectInfoFileName;


// 使用code命令打开对应文件夹
async function open(projectName) {
  try {
  await fsExtra.pathExists(projectInfoJsonPath);
  // 读取当前项目配置文件
  const result = await fsExtra.readJson(projectInfoJsonPath);
  // 记录的项目路径
  const path = result[projectName];
  // 如果项目路径不存在
  if (!path) {
    throw Error(projectName + '这个项目没有被记录，你可以使用 util record 对该项目进行记录');
  }
  const openCommand = `code ${path}`;
  console.log('正在使用vscode打开 ' + projectName + '...');
  try {
    await exec(openCommand);
  } catch (error) {
    throw Error(openCommand + '\n' + '命令启动遇到问题，请确认是否安装 code 指令')
  }
  console.log('启动完毕');
  } catch (error) {
    console.error(error);
  }
  
}

module.exports = open