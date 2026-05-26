# 卡通打地鼠

一个纯静态网页小游戏，包含简单、中等、复杂三种难度。直接打开 `index.html` 就能玩，也可以上传到 GitHub Pages，让任何有网络的人访问。

## 本地打开

1. 进入项目目录：

   ```powershell
   cd D:\23073\Documents\ai_coding\dishu
   ```

2. 双击 `index.html`，或在浏览器里打开这个文件。

## 上传到 GitHub

1. 在 [GitHub](https://github.com) 登录账号。
2. 点击右上角 `+`，选择 `New repository`。
3. 仓库名可以填 `cartoon-whack-a-mole`，选择 `Public`，然后点击 `Create repository`。
4. 在本地项目目录运行下面命令，把 `<你的用户名>` 换成你的 GitHub 用户名：

   ```powershell
   git init
   git add .
   git commit -m "Add cartoon whack-a-mole game"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/cartoon-whack-a-mole.git
   git push -u origin main
   ```

## 开启 GitHub Pages

1. 打开刚创建的 GitHub 仓库页面。
2. 点击 `Settings`。
3. 左侧点击 `Pages`。
4. 在 `Build and deployment` 里：
   - `Source` 选择 `Deploy from a branch`
   - `Branch` 选择 `main`
   - 文件夹选择 `/root`
5. 点击 `Save`。

几分钟后，GitHub 会给你一个网址，通常是：

```text
https://<你的用户名>.github.io/cartoon-whack-a-mole/
```

把这个链接发给别人，任何网络能访问 GitHub Pages 的设备都可以打开游玩。

## 说明

背景使用原创卡通街区风格，气质接近日系儿童动画的明亮、夸张和可爱，但没有直接复制《蜡笔小新》的官方画面或角色。
