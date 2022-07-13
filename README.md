# util-cli

> 一个用于记录项目路径，快速使用vscode打开项目的cli工具

## 安装

```
# 拷贝本项目到你的电脑中
git clone https://github.com/johnhom1024/util-cli.git

# 安装依赖
npm install # 或者 yarn install

# 链接到全局命令中
npm link # 或者 yarn link

# 如果遇到permission denied，则修改./bin/cli.js文件为可执行文件
chmod +x ./bin/cli.js
```

## 使用

1. 记录项目的名称以及路径

```
util record
```

2. 使用vscode打开记录的项目文件夹

```
util open
```

## 示例

1. 首先演示使用`util record`命令

```
➜  ~ util record

? Input your project name yueke-uniapp
? Input your project path ~/backup/fk/md-project/yueke-uniapp
使用vscode打开该目录：~/backup/fk/md-project/yueke-uniapp
启动中...
启动完毕
? 请确认是否打开了正确的目录 Yes
{
  'yueke-uniapp': '~/backup/fk/md-project/yueke-uniapp'
}
配置文件夹目录为：/Volumes/Backup/achieve/node-project/my-node-cli/project-info.json
配置保存成功！以后可以通过使用命令：
 util open yueke-uniapp
这个命令将会使用vscode打开这个项目文件夹
```

2. 使用`util open`打开记录的项目

```
➜  ~ util open
? selectProjectName: (Use arrow keys)
❯ yueke-web
  myueke-uniapp
  yueke-uniapp
? selectProjectName: yueke-uniapp
正在使用vscode打开 yueke-uniapp...
启动完毕
```

## TODO

- [ ] 使用ts + eslint对项目进行改造