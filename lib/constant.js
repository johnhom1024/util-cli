/*
 * @Date: 2022-03-07 09:52:21
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 用于存放常量
 */
const path = require('path');

// 配置文件信息
const projectInfoFileName = 'project-info.json';
const projectInfoJsonPath = path.join(__dirname, '../' + projectInfoFileName);

module.exports = {
  projectInfoJsonPath,
}