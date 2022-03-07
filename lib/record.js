#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node ClI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行

const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fsExtra = require('fs-extra');
const { projectInfoJsonPath } = require('./constant');

// 功能1: 录入项目的路径和项目名称到project-dir.json文件中
async function Record() {
  try {
    const projectInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Input your project name',
        default: '',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Input your project path',
        default: '',
      },
    ]);

    // 项目文件夹路径
    const inputPath = projectInfo.path;
    // 测试使用code命令打开对应的目录，并且询问是否打开了对的文件夹目录
    console.log('使用vscode打开该目录：' + inputPath);
    console.log('启动中...');
    const openCommand  = `code ${inputPath}`;
    // 这里可能会遇到没有安装code命令的情况
    try {
      await exec(openCommand);
    } catch (error) {
      throw Error(openCommand + '\n' + '命令启动遇到问题，请确认是否安装 code 指令')
    }
    console.log('启动完毕');

    // 询问是否打开了正确的项目路径
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        default: true,
        message: '请确认是否打开了正确的目录',
      },
    ]);

    // 如果确认路径无误，则记录当前的项目名称和路径
    if (confirm) {
      // 读取当前项目配置文件，并写入新的配置
      const result = await fsExtra.readJson(projectInfoJsonPath);
      // 判断当前的配置文件中是否有重复的项目名称
      if (result[projectInfo.name]) {
        // 提示用户选择保留的项目路径
        const { finallProjectDir } = await inquirer.prompt([
          {
            type: 'list',
            name: 'finallProjectDir',
            message: `当前配置文件中已存在重复的项目名 ${projectInfo.name}，请选择保留哪一条：`,
            choices: [
              result[projectInfo.name],
              projectInfo.path,
            ],
          },
        ]);

        // 如果选择了原本已存在的项目路径，则终止程序，不需要重写配置文件
        if (result[projectInfo.name] === finallProjectDir) {
          console.log(
            '配置文件中已存在该项目的路径，无需重写配置，程序终止...'
          );
        } else {
          // 写入配置文件
          writeSetting({
            projectName: projectInfo.name,
            projectDir: projectInfo.path,
          });
        }
      } else {
        // 如果没有重复，则直接写入
        await writeSetting({
          projectName: projectInfo.name,
          projectPath: projectInfo.path,
        });
      }
    } else {
    }
  } catch (error) {
    console.error(error);
  }

  // 将项目信息写入配置文件中
  async function writeSetting({ projectName, projectPath }) {
    let result = await fsExtra.readJson(projectInfoJsonPath);
    if (!projectName) {
      throw Error('projectName为空');
    }
    result[projectName] = projectPath;
    console.log(result);
    // 将合并后的项目数据写入配置文件
    await fsExtra.writeJSON(projectInfoJsonPath, result);
    console.log(
      `配置保存成功！以后可以通过使用命令：\n util open ${projectName}\n这个命令将会使用vscode打开这个项目文件夹`
    );
  }
}

module.exports = Record;
