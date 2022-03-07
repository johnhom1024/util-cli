#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node ClI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行

const program = require('commander');
// 初始化配置文件
require('../lib/bootstrap');

program
  // 定义命令和参数
  .command('record')
  .description('record a project name and path')
  .action((name, options) => {
    const record = require('../lib/record');
    record();
  })

program
  .command('open [project-name]')
  .description('open the project that has been recorded')
  .action((projectName) => {
    const open = require('../lib/open')
    open(projectName)
  })
  
program
   // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 用于解析process.argv，设置options以及触发commands
program.parse(process.argv)