# `npm-mobile`

> 基于 Lerna 管理的多packages代码仓库。

## 使用

全局安装lerna，后续管理packages需要用到。

```
npm i lerna -g
```

## Lerna 常用命令

1. 初始化 lerna 项目

    ```
    # 固定模式，每次publish，默认更新所有packages的版本，可选择发布指定的packages
    lerna init

    # 独立模式，仅发布修改的package
    lerna init --independent
    ```

2. 创建package，并给package添加依赖

    ```
    # 创建packages
    lerna create @mobile/cli

    # 给package添加依赖
    lerna add axios --scope @mobile/cli
    lerna add @mobile/cli-shared-utils --scope @mobile/cli
    lerna add @mobile/cli-* --scope @mobile/cli
    ```

3. 清理packages依赖

    ```
    lerna clean
    ```

4. 安装依赖

    ```
    lerna bootstrap
    ```

5. 发布

    ```
    lerna publish
    # 独立发布，不生成changelog、不标记tag
    lerna publish --canary
    # 独立发布 beta 版本
    lerna publish --canary --preid beta
    ```

6. 执行包下面的npm scripts

    ```
    # 执行所有packages中的 dist
    lerna run dist

    # 只执行@mobile/ui-next中的 dist
    lerna run --scope @mobile/ui-next dist

    # 只执行除了匹配@mobile/*外的项目中的 dist
    lerna run --ignore @mobile/* dist
    ```

## 更多命令

参考  lerna -h 帮助

```
lerna -h
Usage: lerna <command> [options]

Commands:
  lerna add <pkg> [globs..]  Add a single dependency to matched packages
  lerna bootstrap            Link local packages together and install remaining package dependencies
  lerna changed              List local packages that have changed since the last tagged release                                                                                                                                                         [aliases: updated]
  lerna clean                Remove the node_modules directory from all packages
  lerna create <name> [loc]  Create a new lerna-managed package
  lerna diff [pkgName]       Diff all packages or a single package since the last release
  lerna exec [cmd] [args..]  Execute an arbitrary command in each package
  lerna import <dir>         Import a package into the monorepo with commit history
  lerna init                 Create a new Lerna repo or upgrade an existing repo to the current version of Lerna.
  lerna link                 Symlink together all packages that are dependencies of each other
  lerna list                 List local packages                                                                                                                                                                                                      [aliases: ls, la, ll]
  lerna publish [bump]       Publish packages in the current project.
  lerna run <script>         Run an npm script in each package that contains that script
  lerna version [bump]       Bump version of packages changed since the last release.

Global Options:
  --loglevel       What level of logs to report.                                                                                                                                                                                                   [string] [default: info]
  --concurrency    How many processes to use when lerna parallelizes tasks.                                                                                                                                                                           [number] [default: 8]
  --reject-cycles  Fail if a cycle is detected among dependencies.                                                                                                                                                                                                [boolean]
  --no-progress    Disable progress bars. (Always off in CI)                                                                                                                                                                                                      [boolean]
  --no-sort        Do not sort packages topologically (dependencies before dependents).                                                                                                                                                                           [boolean]
  --max-buffer     Set max-buffer (in bytes) for subcommand execution                                                                                                                                                                                              [number]
  -h, --help       Show help                                                                                                                                                                                                                                      [boolean]
  -v, --version    Show version number
```
