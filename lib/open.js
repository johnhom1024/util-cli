#! /usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const { projectInfoJsonPath } = require('./constant');


// 使用code命令打开对应文件夹
async function open(projectName) {
  try {

  // 读取当前项目配置文件
  const result = await fsExtra.readJson(projectInfoJsonPath);
  
  // 如果没有输入项目名称
  if (!projectName) {
    const choices = Object.keys(result);
    // 使用inquirer输入当前已记录的项目名称
    const { selectProjectName } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectProjectName',
        messsage: '选择你要打开的项目名称',
        choices,
      }
    ])

    projectName = selectProjectName;
  }

  
  // 记录的项目路径
  const projectPath = result[projectName];
  // 如果项目路径不存在
  if (!projectPath) {
    throw Error(projectName + '这个项目没有被记录，你可以使用 util record 对该项目进行记录');
  }
  const openCommand = `code ${projectPath}`;
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