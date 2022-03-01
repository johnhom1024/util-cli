/*
 * @Date: 2022-03-01 12:27:45
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

const fsExtra = require('fs-extra');


// 配置文件信息
const projectInfoFileName = 'project-info.json';
const projectInfoJsonPath = './' + projectInfoFileName;


// 判断配置文件是否存在
if (!fsExtra.pathExistsSync(projectInfoJsonPath)) {
  // 初始化配置文件
  fsExtra.outputJSONSync(projectInfoJsonPath, {});
}